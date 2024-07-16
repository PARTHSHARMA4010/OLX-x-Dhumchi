import express from 'express'
import { login ,register , logout} from '../controllers/userControllers.js'
import { isAuth } from '../middlewares/auth.js'

const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/logout",isAuth,logout)

export default router