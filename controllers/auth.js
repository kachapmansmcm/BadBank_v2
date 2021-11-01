const User = require('../models/Users');
const ErrorResponse = require('../utils/errorRespnose');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    const {username, email, password} = req.body;

    try {
        const user = await User.create({
            username, email, password
        });
        return sendToken(user, 201, res);
    } catch (error) {
        return next(error);
    };
};

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    if(!username || !password) {
       return next(new ErrorResponse("Username and Password required", 400));
    } 
    try {
        const user = await User.findOne({username}).select("+password");

        if(!user){
            return next(new ErrorResponse("Invalid Credentials", 401));
        };
        const isMatch = await user.matchPassword(password);

        if(!isMatch) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }

        return sendToken(user, 201, res);
        
    } catch (error) {
       return next(error);
    }
    
};

exports.resetpassword = (req, res, next) => {
    res.send("Reset Password Route");
};

exports.getUserInfo = (req, res, next) => {
    let token;

    if(req.headers.authorization  && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token) {
        return next(new ErrorResponse("Not Authorized, no token", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json(decoded);

};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success: true, token});
}