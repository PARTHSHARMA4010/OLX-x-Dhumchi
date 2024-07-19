import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },

    phone: {
        type: String,
        required: [true, "Please enter your phone number"],
    },

    location: {
        type: String,
        required: [true, "Please enter your location"]
    },

    buyer_id:{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        option:{
            type: String,
            enum: ["Buyer"],
            required: true
        }
    },

    seller_id:{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        option:{
            type: String,
            enum: ["Seller"],
            required: true
        }
    }


  },{timestamps: true})

  export const Request = mongoose.model("Request", requestSchema)
