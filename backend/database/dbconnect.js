import mongoose from "mongoose";
// import { DbName } from "../constants.js";

export const dbconnnect = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Dhumchi_X_OLX"
    })
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => {
        console.log(`Error in database connection : ${err}`)
    })
}