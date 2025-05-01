const User = require('../model/User');
const jwt = require('../utils/jwt');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { sendResetEmail } = require('../utils/mailer');

exports.signup = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        // We'll let the User model's pre-save hook handle password hashing
        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password, // No need to hash here, model middleware will handle it
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Use the model's matchPassword method for consistency
        const isMatch = await existingUser.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.generateToken(existingUser._id);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

exports.getuser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

exports.forgotpassword = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (!existingUser) return res.status(404).json({ message: 'User not found' });

        const token = crypto.randomBytes(32).toString('hex');
        existingUser.resetToken = token;
        existingUser.resetTokenExpiration = Date.now() + 3600000; // 1 hour
        await existingUser.save();

        const resetLink = `http://localhost:3000/resetpassword/${token}`;
        await sendResetEmail(existingUser.email, resetLink);
        res.json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending reset link', error });
    }
};

exports.resetpassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmpassword } = req.body;

        const existingUser = await User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() },
        });
        if (!existingUser) return res.status(404).json({ message: 'Invalid or expired token' });

        if (password !== confirmpassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // No need to hash here, set password and let model middleware handle it
        existingUser.password = password;
        existingUser.resetToken = undefined;
        existingUser.resetTokenExpiration = undefined;
        await existingUser.save();

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error });
    }
};