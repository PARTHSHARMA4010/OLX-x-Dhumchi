import express from 'express'
import { deleteCar, getAllcars, getMyCars, sellCar, updateCar } from '../controllers/carControllers.js'
import { isAuth } from '../middlewares/auth.js'
const router = express.Router()

router.get("/getallcars", getAllcars)
router.post("/sell",isAuth,sellCar)
router.get("/getmycars",isAuth,getMyCars)
router.put("/updatecar/:id",isAuth,updateCar)
router.delete("/deletecar/:id",isAuth,deleteCar)

export default router