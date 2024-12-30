
const userService = {};
const userModel = require("../Models/User")

userService.create = async(payload)=>{
    
    return await userModel.create(payload);
    
};

userService.find = async(params,select)=>{
    
    return await userModel.find(params).select(select);
    
};

userService.findOne = async(params,select)=>{
    
    return await userModel.findOne(params).select(select);
    
};

module.exports = userService;