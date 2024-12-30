const auth_routes = require("./representations/auth/auth_routes");


const routes = (app)=> {
    app.use('/api/auth', auth_routes);
}
  
module.exports = { routes };