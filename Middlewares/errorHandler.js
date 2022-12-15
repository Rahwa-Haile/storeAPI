const {CustomAPIError} = require('../errors/custom-error')

const errorHandlerMiddleware = (err, req, res, next)=>{
    console.log(err)
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).send('No such product')
    }
    res.status(500).send('Something is wrong, please try again later')
}

module.exports = errorHandlerMiddleware