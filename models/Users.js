const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a Username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email required"],
        unique: true,
        match: [/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Email invalid"]
    },
    password: {
        type: String,
        required: [true, "Password required"],
        minlength: 8,
        select: false
    },
    resetPasswordToken: String,
    accountBalance: {
        type: Number,
        default: 0.00,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});


UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.getSignedToken = function() {
    return jwt.sign({id: this._id, username: this.username, accountBalance: this.accountBalance, isAdmin: this.isAdmin, email: this.email}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const User = mongoose.model("User", UserSchema);




module.exports = User;