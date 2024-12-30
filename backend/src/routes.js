const auth_routes = require("./representations/auth/auth_routes");
const tasks_routes = require("./representations/tasks/tasks_routes");


const routes = (app)=> {
    app.use('/api/auth', auth_routes);
    app.use('/api/tasks', tasks_routes);
}
  
module.exports = { routes };