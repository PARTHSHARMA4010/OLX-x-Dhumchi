import express from 'express'
import { isAuth } from '../middlewares/auth.js';
import { buyerallreq, sellerDeleteReq, sellerviewallreq, sendReq  } from '../controllers/buyerReq.js';

const router = express.Router()


router.get("/buyer/getall", isAuth, buyerallreq);
router.get("/seller/getall", isAuth, sellerviewallreq);
router.delete("/delete/:id", isAuth, sellerDeleteReq);
router.post("/sendreq",isAuth,sendReq)


export default router