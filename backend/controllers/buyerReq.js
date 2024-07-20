import { catchasyncError } from "../middlewares/catchasyncError.js";
import { Request } from "../models/request.model.js";
import ErrorHandler from "../middlewares/error.js";
import { Car } from "../models/car.model.js";

export const buyerallreq = catchasyncError(
    async (req, res, next) => {
      const { option } = req.user;
      if (option === "Seller") {
        return next(
          new ErrorHandler("You are Seller", 400)
        );
      }
      const { _id } = req.user;
      const requests = await Request.find({ "buyer_id.user": _id });
      res.status(200).json({
        success: true,
        requests,
      });
    }
  );
  


  export const sellerviewallreq = catchasyncError(
    async (req, res, next) => {
      const { option } = req.user;
      if (option === "Buyer") {
        return next(
          new ErrorHandler("You are Buyer", 400)
        );
      }
      const { _id } = req.user;
      const requests = await Request.find({ "seller_id.user": _id });
      res.status(200).json({
        success: true,
        requests,
      });
    }
  );
  



  export const sellerDeleteReq = catchasyncError(
    async (req, res, next) => {
      const { option } = req.user;
      if (option === "Buyer") {
        return next(
          new ErrorHandler("You are Buyer", 400)
        );
      }

      const { id } = req.params;
      const requests = await Request.findById(id);
      if (!requests) {
        return next(new ErrorHandler("Request not found!", 404));
      }
      await requests.deleteOne();
      res.status(200).json({
        success: true,
        message: "Request Deleted!",
      });
    }
  );
  

  export const sendReq = catchasyncError(async (req, res, next) => {
    const { option } = req.user;
    if (option === "Seller") {
      return next(
        new ErrorHandler("You are Seller", 400)
      );
    }
    

    const { name, phone, location, price, remark, carId } = req.body;
    const seller_id = {
      user: req.user._id,
      role: "Seller",
    };

    if (!carId) {
      return next(new ErrorHandler("Car not found", 404));
    }
    const carDetail = await Car.findById(carId);
    if (!carDetail) {
      return next(new ErrorHandler("Car not found!", 404));
    }
  
    const buyer_id = {
      user: carDetail.postedBy,
      role: "Buyer",
    };
    if (
      !name ||
      !phone ||
      !location ||
      !price ||
      !remark ||
      !buyer_id ||
      !seller_id 
    ) {
      return next(new ErrorHandler("Please fill all fields.", 400));
    }
    const request = await Request.create({
      name,
      phone,
      price,
      location,
      remark,
      buyer_id,
      seller_id,
      
    });
    res.status(200).json({
      success: true,
      message: "Request Submitted!",
      request,
    });
  });
  