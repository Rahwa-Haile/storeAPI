class CustomAPIError extends Error{
    constructor(message, statusCode){
    super(message)
    statusCode = this.statusCode
    }
}


const createCustomError = (msg, statusCode)=>{
    return new CustomAPIError(msg, statusCode)
}

module.exports = {createCustomError, CustomAPIError}