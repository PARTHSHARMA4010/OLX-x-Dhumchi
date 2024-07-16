import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true, "Please enter name"]
    },

    email: {
        type: String,
        required : [true, "Please enter email"],
        validate: [validator.isEmail, "Please enter correct email"]
    },

    password: {
        type: String,
        required : [true, "Please enter password"],
        minlength: [4, "Password must be atleast 6 characters long"],
        maxlength: [12, "Password length should not exceed 12 character"],
        select: false
    },

    phone: {
        type: Number,
        required: [true, "Please enter phone number"]
    },

    option: {
        type: String,
        required: [true, "Select any option"],
        enum: ["Buyer", "Seller"]
    }
    

},{timestamps: true})

userSchema.pre("save", async function (next){
    if(!this.isModified){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.passwordComparision = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.jwttoken = function (){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

export const User = mongoose.model("User",userSchema)