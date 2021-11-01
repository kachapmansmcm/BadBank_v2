
const User = require('../models/Users');
const ErrorResponse = require('../utils/errorRespnose');
const jwt = require('jsonwebtoken');


exports.getPrivateData = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: "Protected Data accessed"
    })
}; 


exports.update = async (req, res, next) => {
    const {username, email, password, accountBalance} = req.body;
    try {
        const user = await User.findOne({username}).select("+password");

        if(!user){
            return next(new ErrorResponse("User Not found", 401));
        };
        if(accountBalance){
            user.accountBalance = accountBalance;
            let response = await user.save();
        }  
    } catch (error) {
       return next(error);
    }
    res.status(200).json({
        success: true,
        data: "UserUpdated"
    })
};


exports.getAll = async (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded.isAdmin){
        res.status(404).json({
            success: false,
            data: "Access Denied"
        })
    } else {        
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users
        })
    }
}; 

exports.deleteUser = async (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded.isAdmin){
        res.status(404).json({
            success: false,
            data: "Access Denied"
        })
    } else {
        const { username } = req.body;
        User.findOneAndDelete({ username: username }, function (err) {
            if(err) console.log(err);
            console.log("Successful deletion");
            }
        );
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users
        })
    }
};