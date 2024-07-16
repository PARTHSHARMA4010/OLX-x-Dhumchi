import {catchasyncError} from "../middlewares/catchasyncError.js"
import { Car } from "../models/car.model.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllcars = catchasyncError(async (req, res, next) => {
  const cars = await Car.find({ expired: false });
  res.status(200).json({
    success: true,
    cars,
  });
});


export const sellCar = catchasyncError(async (req, res, next) => {
  const { option } = req.user;
  if (option === "Buyer") {
    return next(
      new ErrorHandler("You are Buyer.", 400)
    );
  }
  const {
    model,
    description,
    fuel,
    state,
    city,
    fixedRate,
    startfrom,
    upto,
  } = req.body;

  if (!model || !description || !fuel || !state || !city ) {
    return next(new ErrorHandler("Please provide full details.", 400));
  }

  if ((!startfrom || !upto) && !fixedRate) {
    return next(
      new ErrorHandler(
        "Please either provide fixed or ranged price.",
        400
      )
    );
  }

  if (startfrom && upto && fixedRate) {
    return next(
      new ErrorHandler("Cannot Enter Fixed and Ranged price together.", 400)
    );
  }
  const postedBy = req.user._id;
  const car = await Car.create({
    model,
    description,
    fuel,
    state,
    city,
    fixedRate,
    startfrom,
    upto,
    postedBy,
  });
  res.status(200).json({
    success: true,
    message: "Car available for sale",
    car,
  });
});


