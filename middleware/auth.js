//check JWT
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const ErrorResponse = require('../utils/errorRespnose');


exports.protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization  && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];

    }
    if(!token) {
        return next(new ErrorResponse("Not Authorized, no token", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id)

        if(!user){
            return next(new ErrorResponse("User not found", 404));
        }

        req.user = user;
        return next();
    } catch (e) {
        return next(new ErrorResponse(`Exception ${e.message}`, 401));
    }
}