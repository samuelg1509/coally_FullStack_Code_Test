require("dotenv").config();
const express = require("express");
const chalk = require('chalk'); 
const connectDB = require("./src/config/database");
const response = require('./src/libs/responses')
const { ENV } = require('./src/config/constants');
const app = express();

// DB Connection
connectDB();

app.use(express.json());

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
