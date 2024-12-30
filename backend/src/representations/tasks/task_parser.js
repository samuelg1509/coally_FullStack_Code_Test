let taskParser = {};
const moment = require('moment');

taskParser.basic = (task)=>{
    let response = task ? {
        id:task._id,
        title:task.title,
        description:task.description,
        completed:task.completed,
        createdAt:moment(task.createdAt).format("DD/MM/YYYY h:mm:ss"),
         
    } : {};

    return response;

};

module.exports = taskParser;