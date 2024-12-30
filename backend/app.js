require("dotenv").config();
const express = require("express");
const chalk = require('chalk'); 
const connectDB = require("./src/config/database");
const response = require('./src/libs/responses')
const { ENV } = require('./src/config/constants');
const { routes } = require("./src/routes");
const Middleware = require("./src/Middleware/SessionMiddleware");
const app = express();

// DB Connection
connectDB();

app.use(express.json());

//Session Middleware
app.use(Middleware);

// Routes
routes(app);

// // Error handler
app.use((err, req, res, next) => {
    if (ENV.NODE_ENV == "development") console.error('Error: ',err);
    if(err) return response.error(res, err.status || 500, err.message || 'Internal Error');
});

// // Not found handler
app.all('*', (req, res) => {
    return response.error(res, 404, 'Not found');
});

// 
app.listen(ENV.PORT, () => {
    if (ENV.NODE_ENV == "development"){
        console.log(chalk.underline.whiteBright.bgCyan('Samuel Flores => Coally FullStack Code Challenge'),);
        console.log(chalk.green.white(`API alive and listening on port:` ),chalk.green(`${ENV.PORT}`));
    }
});
