import { catchasyncError } from "../middlewares/catchasyncError.js";
import { Request } from "../models/request.model.js";
import ErrorHandler from "../middlewares/error.js";

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
        return next(new ErrorHandler("Application not found!", 404));
      }
      await requests.deleteOne();
      res.status(200).json({
        success: true,
        message: "Request Deleted!",
      });
    }
  );
  

