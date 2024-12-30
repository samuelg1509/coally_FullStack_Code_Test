
const taskService = {};
const taskModel = require("../Models/Task")

taskService.create = async(payload)=>{
    
    return await taskModel.create(payload);
    
};

taskService.findOne = async(params,select = '')=>{
    
    return await taskModel.findOne(params).select(select);
    
};

taskService.find = async (params, pagination, select = '') => {
    const skip = pagination['limit'] * (pagination['page'] - 1);

    return await taskModel.find(params).select(select)
        .sort([[pagination['orderBy'], pagination['order']]])
        .limit(pagination['limit'])
        .skip(skip)
        .populate({path:'userId',select:'username'});
};

taskService.updateOne = async (params, payload) => {

    return await taskModel.updateOne(params,payload);
};

taskService.deleteOne = async (params) => {

    return await taskModel.deleteOne(params);
};

module.exports = taskService;