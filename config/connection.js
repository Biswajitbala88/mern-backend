const mongoose = require("mongoose");
 
 const connectDB = async (url) => {
   try {
     await mongoose.connect(url);
   } catch (error) {
     console.log(error);
   }
 };
 
 mongoose.connection.once("open", () => {
   console.log("DB connect successfully");
 });
 
 module.exports = connectDB;