import { catchasyncError } from "../middlewares/catchasyncError.js"
import  ErrorHandler  from "../middlewares/error.js"
import {User} from "../models/user.model.js"
import { sendToken } from "../utils/jwttoken.js"

export const register = catchasyncError(async(req,res,next) => {
    const {name, email,password,phone,option} = req.body
    if(!name || !email || !password || !phone || !option){
        return next(new ErrorHandler("Fill all entries"))
    }

    const isEmail = await User.findOne({email})

    if(isEmail){
        return next(new ErrorHandler("Already registered"))
    }

    const user = await User.create({
        name,
        email,
        password,
        phone,
        option
    })

    sendToken(user, 200, res, "User registered");

    
})

export const login = catchasyncError(async (req, res, next) => {
    const { email, password, option } = req.body;
    if (!email || !password || !option) {
      return next(new ErrorHandler("Please provide email ,password and option."));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email Or Password.", 400));
    }
    const isPasswordMatched = await user.passwordComparision(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Email Or Password.", 400));
    }
    if (user.option !== option) {
      return next(
        new ErrorHandler(`User with provided email and ${option} not found!`, 404)
      );
    }
    sendToken(user, 201, res, "User Logged In!");
  });



  export const logout = catchasyncError(async (req, res, next) => {
    res
      .status(201) 
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Logged Out Successfully.",
      });
  });
  