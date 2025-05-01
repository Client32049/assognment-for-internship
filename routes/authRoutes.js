const express = require('express');
const router = express.Router();
const { autheentication } = require('../middlewares/authmiddleware');
const { login, signup, forgotpassword, getuser, resetpassword } = require('../controller/authcontroller');

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", autheentication, getuser);
router.post("/forgotpassword", forgotpassword);
router.post("/resetpassword/:token", resetpassword);

module.exports = router;