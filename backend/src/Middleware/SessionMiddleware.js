"use strict";

const Auth = require("../libs/Auth");
const response = require("../libs/responses");
const {guestPath, basicPath} = require('../config/constants');

/**
 * Header authorizations parser 
 * @param {*} parseHeader
 */

const Middleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const pathPath = req.path.split("/");

    if (!authorization) {
      //Guest path

      if(
          guestPath.includes(pathPath[3]) 

      ){
        
        return next();
        
      }else{
        
        return response.error(res,401,"Unauthorized");

      }
    };

    const authHeader = new Auth(authorization);
    const typeAuth = await authHeader.authorization;
    const userPayload = await authHeader.getUserInfo;

    if (!userPayload) 
        return response.error(res,401,"Unauthorized");

    if (userPayload.error) 
        return response.error(res,401,userPayload.error);

    if (typeAuth === "basic") {
      //Auth path
      if (basicPath.includes(pathPath[3])) {

        return next();

      } else {

        return response.error(res,401,"Unauthorized");
        

      }
    }

    req.body.endUser = {
      id: userPayload._id.toString(),
      username: userPayload.username,
      email: userPayload.email
    };

    return next();

  } catch (e) {

    next(e);
    
  }
};

module.exports = Middleware;
