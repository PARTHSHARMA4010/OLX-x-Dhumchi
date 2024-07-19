import express from 'express'
import { isAuth } from '../middlewares/auth.js';
import { buyerallreq, sellerDeleteReq, sellerviewallreq } from '../controllers/buyerReq.js';

const router = express.Router()


router.get("/buyer/getall", isAuth, buyerallreq);
router.get("/seller/getall", isAuth, sellerviewallreq);
router.delete("/delete/:id", isAuth, sellerDeleteReq);


export default router