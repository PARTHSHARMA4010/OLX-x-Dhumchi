import express from 'express'
import { getAllcars, sellCar } from '../controllers/carControllers.js'
import { isAuth } from '../middlewares/auth.js'
const router = express.Router()

router.get("/getallcars", getAllcars)
router.post("/sell",isAuth,sellCar)

export default router