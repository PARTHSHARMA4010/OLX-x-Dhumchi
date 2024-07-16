import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  Model: {
    type: String,
    required: [true, "Please provide model name."],
    minLength: [3, "Title must contain at least 3 Characters!"],
    maxLength: [30, "Title cannot exceed 30 Characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide decription."],
    minLength: [30, "Description must contain at least 30 Characters!"],
    maxLength: [500, "Description cannot exceed 500 Characters!"],
  },
  fuel: {
    type: String,
    required: [true, "Please provide fuel type of car"],
  },
  state: {
    type: String,
    required: [true, "Please provide state name."],
  },
  city: {
    type: String,
    required: [true, "Please provide a city name."],
  },
  fixedRate: {
    type: Number,
  },
  startfrom: {
    type: Number,
  },
  upto: {
    type: Number,
  },
  sold: {
    type: Boolean,
    default: false,
  },
  postedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Car = mongoose.model("Car", carSchema);