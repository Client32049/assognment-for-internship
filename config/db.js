const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        // Use direct connection string without string manipulation
        const mongoURI = "mongodb+srv://meenaraju978:r6aBM4fz2UK7AOlN@cluster0.z5gisfe.mongodb.net/newProjectDB?retryWrites=true&w=majority";
        
        // Connect to MongoDB
        const conn = await mongoose.connect(mongoURI);
        console.log("MongoDB connected successfully");
        console.log(`Database Name: ${conn.connection.db.databaseName}`);
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        if (err.code) {
            console.error(`Error Code: ${err.code}, Codename: ${err.codeName}`);
        }
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;