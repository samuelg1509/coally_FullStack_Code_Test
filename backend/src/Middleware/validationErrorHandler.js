const { validationResult } = require("express-validator");
const response = require("./../libs/responses")

const validationErrorHandler = (req, res, next) => {
  try {

    validationResult(req).throw();
    return next();
    
  } catch (err) {
   
    response.error(res,403,"Validation errors",err.array())


  }
};

module.exports = validationErrorHandler;