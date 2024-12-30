const mongoose = require("mongoose");
const { ENV } = require('./constants');

const URI = ENV.MONGO_DB_URI || "mongodb://localhost:27017/coally_test";

const connectDB = async()=> {
  try {
    await mongoose.connect(URI);
    if(ENV.NODE_ENV == "development") console.log("MongoDB connected", URI);
  } catch (error) {
    if(ENV.NODE_ENV == "development") console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;