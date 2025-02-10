export const errorHandler = (statusCode, message)=>{
    // javascript constructor 
    const error = new Error()
    error.statusCode = statusCode;
    error.message = message;
    return error;
}