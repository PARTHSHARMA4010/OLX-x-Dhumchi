import {catchasyncError} from "../middlewares/catchasyncError.js"
import { Car } from "../models/car.model.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllcars = catchasyncError(async (req, res, next) => {
  const cars = await Car.find({ sold : false });
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


  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume File Required!", 400));
  }

  const { photo } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(photo.mimetype)) {
    return next(
      new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    photo.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload photo to Cloudinary", 500));
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

  if (!model || !description || !fuel || !state || !city || !photo) {
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
    photo: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "Car available for sale",
    car,
  });
});


export const getMyCars = catchasyncError(async (req, res, next) => {
  const { option } = req.user;
  if (option === "Buyer") {
    return next(
      new ErrorHandler("You are Buyer", 400)
    );
  }
  const myCars = await Car.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myCars,
  });
});

export const updateCar = catchasyncError(async (req, res, next) => {
  const { option } = req.user;
  if (option === "Buyer") {
    return next(
      new ErrorHandler("You are Buyer", 400)
    );
  }
  const { id } = req.params;
  let car = await Car.findById(id);
  if (!car) {
    return next(new ErrorHandler("OOPS! Car not found.", 404));
  }
  car = await Car.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Car status Updated!",
  });
});



export const deleteCar = catchasyncError(async (req, res, next) => {
  const { option } = req.user;
  if (option === "Buyer") {
    return next(
      new ErrorHandler("You are Buyer", 400)
    );
  }
  const { id } = req.params;
  const car = await Car.findById(id);
  if (!car) {
    return next(new ErrorHandler("OOPS! Car not found.", 404));
  }
  await car.deleteOne();
  res.status(200).json({
    success: true,
    message: "Car Deleted!",
  });
});



// export const getSingleCar = catchasyncError(async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const car = await Car.findById(id);
//     if (!car) {
//       return next(new ErrorHandler("Car not found.", 404));
//     }
//     res.status(200).json({
//       success: true,
//       car,
//     });
//   } catch (error) {
//     return next(new ErrorHandler(`Invalid ID / CastError`, 404));
//   }
// });