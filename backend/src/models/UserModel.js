import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userModel = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    role: { 
        type: String, required: true, default:'user'
    },
    addresses: { 
        type: [Schema.Types.Mixed] 
    },
    profilePic: {
        type: String
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true})

userModel.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    this.role = "user"
    return next()
})

userModel.methods.isPasswordCorrect = async function(password){
    return bcrypt.compare(password, this.password)
}

userModel.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userModel.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            
        }
    )
}

export const User = mongoose.model("User", userModel)