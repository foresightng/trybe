const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
   //custom error object to handle non custom errors
  let customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || 'Something went wrong try again later',
  }
  

 if(err.code && err.code === 11000) {
    customError.msg = `User with this ${Object.keys(
      err.keyValue
    )} already exists`
    customError.statusCode = 400
 }

 if(err.name === 'CastError') {
    customError.msg = 'You inputed an Invalid id'
    customError.statusCode = 400
  }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors).map(
      (item) => item.message).join(', ')
      customError.statusCode = 400
    }

 return res.status(customError.statusCode).json({msg: customError.msg})
 //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err })
}


module.exports = errorHandlerMiddleware
