const mongoose = require("mongoose");
require("dotenv").config();

let connectDB = async (req, res, next)=>{
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to DB");
    next();
  }
  catch(err){
      console.log(err);
  }
}

module.exports = {
  connectDB
}