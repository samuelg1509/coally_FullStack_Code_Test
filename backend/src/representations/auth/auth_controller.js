const Encrypt = require("../../libs/Encrypt");
const response = require("../../libs/responses");
const Auth = require("../../libs/Auth");
const userService = require("./../../Services/user")

let authController = {};

authController.register = async(req, res, next) => {
  
    try {
      
        const body = req.body;
    
        const or = { 
            $or:[ 
                {'email':body.email}, 
                {'username':body.username}
            ]
        };

        const validation = await userService.find(or,{_id:1});
        if(validation.length < 1){

            const encrypt = new Encrypt(body.password);
            body['password'] = await encrypt.encrypt_str();

            await userService.create(body);
            response.ok(res, 201, "Success");

        }else{

            response.error(res,403,"User, or email already exists");


        }
  
    } catch (error) {
  
      next(error);
  
    }
  };

  authController.login = async (req, res, next) => {
  
    try {
      
      if(!req.headers.authorization)
        return response.error(res,401,"Invalid username or password");
  
      const authHeader = new Auth(req.headers.authorization);
      const valid = await authHeader.validate();
      
      if (valid) {
        const data = {
          sesion_token: await authHeader.setAuthToken()
        };
  
        response.ok(res, 200, "Success", data);
  
      } else {

        response.error(res,401,"Invalid username or password");
  
      }
        
    } catch (error) {
  
      next(error);
  
    }
  };

module.exports = authController;


