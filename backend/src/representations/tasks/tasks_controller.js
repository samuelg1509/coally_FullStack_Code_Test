const response = require("../../libs/responses");
const taskService = require("./../../Services/task");
const taskParser = require("./task_parser");

let tasks_controller = {};

tasks_controller.create = async(req, res, next) => {
  
    try {
      
        const body = req.body;
        const payload = {
          title: body.title,
          description: body.description ?? '',
          completed: body.completed ?? false,
          userId: body.endUser.id
        };

        await taskService.create(payload);
        response.ok(res, 201, "Success");

  
    } catch (error) {
  
      next(error);
  
    }
};


tasks_controller.getAll = async(req, res, next) => {
  
  try {
    
      
    let data = [];
    const {limit, page, orderby, order, state} = req.query;
    const endUser = req.body.endUser;
    const pagination = {
      limit: limit ?? 10,
      page: page ?? 1,
      orderBy: orderby ?? 'createdAt',
      order: order === 'desc' ? 'desc' : 'asc'
    };
    let params = {userId:endUser.id};

    if(state){
      params['completed'] = state === 'pending' ? false : true;
    }
    
    const tasks = await taskService.find(params,pagination)

    for(const task of tasks) {
      data.push(taskParser.basic(task));
    };

    response.ok(res, 200, "Success", data);


  } catch (error) {

    next(error);

  }
};

tasks_controller.getById = async(req, res, next) => {
  
  try {
    
    const _id = req.params.id;
    const endUser = req.body.endUser;
    let params = {_id,userId:endUser.id};
    
    const task = await taskService.findOne(params);

    if(!task){

      response.error(res,404,"Task not found");

    }else{
      
      const data = taskParser.basic(task);
      response.ok(res, 200, "Success", data);
    }



  } catch (error) {

    next(error);

  }
};

tasks_controller.update = async(req, res, next) => {
  
  try {
    
      const body = req.body;
      const _id = req.params.id;
      const endUser = req.body.endUser;
      const payload = {};

      const validation = await taskService.findOne({_id});
      if(validation){

        if(body.title) payload['title'] =  body.title;
        if(body.description) payload['description'] =  body.description;
        if([true,false].includes(body.completed)) payload['completed'] =  body.completed;
  
        await taskService.updateOne({_id,userId:endUser.id},payload);
        response.ok(res, 200, "Success");

      }else{

          response.error(res,404,"Task not found");


      }

     


  } catch (error) {

    next(error);

  }
};

tasks_controller.delete = async(req, res, next) => {
  
  try {
    
      const _id = req.params.id;
      const endUser = req.body.endUser;

      const validation = await taskService.findOne({_id});
      if(validation){

        const data = await taskService.deleteOne({_id,userId:endUser.id});
        response.ok(res, 200, "Success");

      }else{

          response.error(res,404,"Task not found");


      }
     
      


  } catch (error) {

    next(error);

  }
};

module.exports = tasks_controller;


