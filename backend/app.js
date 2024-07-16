import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import userRouter from './routes/userRouter.js' 
import applicationRouter from './routes/applicationRouter.js' 
import sellerRouter from './routes/sellerRouter.js' 
import { dbconnnect } from './database/dbconnect.js';
import { errorMiddleware } from './middlewares/error.js';

const app = express();
dotenv.config({
    path: './config/config.env'
})

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

app.use("/api/user", userRouter)
app.use("/api/applicationRouter", applicationRouter)
app.use("/api/sellerRouter", sellerRouter)

dbconnnect()

app.use(errorMiddleware)

export default app