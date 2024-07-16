class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super(message); 
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal server error middleware"
    err.statusCode = err.statusCode || 500

    if(err.name === "CaseError"){
        const message = `Resource invalid path ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(message, 400)
    }

    if(err.name === "JsonWebTokenError"){
        const message = `JWT error`
        err = new ErrorHandler(message, 400)
    }

    if(err.name === "TokenExpiredError"){
        const message = `JWT expired`
        err = new ErrorHandler(message, 400)
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}

export default ErrorHandler