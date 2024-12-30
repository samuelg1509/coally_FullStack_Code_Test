"use strict";

const jwt = require("jsonwebtoken");
const { TokenExpiredError } = require("jsonwebtoken");
const { ENV } = require('../config/constants');


/** Class represents a Json web token instance. 
 * @author Samuel Flores
*/
class JWToken {

  /**
     * Check the validity of a token.
     * @method
     * @param {string} token - Token to validate.
     * @returns {object} -> Operation result.
     * @author Samuel Flores
  */
  verifyJwt = (token) => {
    return jwt.verify(token, ENV.SECRET_KEY, (err, decoded) => {
        if (err) {
            if (err instanceof TokenExpiredError) {
            return { error: "Sesion expired" };
            } else {
            return { error: "Invalid token" };
            }
        } else {
            return  decoded;
        }
    });
  };

  /**
     * Check the validity of a token.
     * @method
     * @param {object} payload - Payload to set in the jwt.
     * @param {number|string} expiresInMinute - Minutes to expire the jwt.
     * @returns {string} -> Json web token.
     * @author Samuel Flores
  */
  parseJwt = (payload, expiresInMinute = ENV.SESION_TIME) => {
    
    return jwt.sign(
        payload,
        ENV.SECRET_KEY,
        {
            expiresIn: 60 * parseInt(expiresInMinute),  
        }
    );
  };
}

module.exports = JWToken;