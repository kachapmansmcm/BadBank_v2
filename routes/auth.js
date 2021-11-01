const express = require('express');
const router = express.Router();
const { register, login, resetpassword, getUserInfo } = require('../controllers/auth');


router.route("/register").post(register);

router.route("/login").post(login);

router.route("/resetpassword/:resetToken").put(resetpassword);

router.route("/getUserInfo").get( getUserInfo );
module.exports = router;