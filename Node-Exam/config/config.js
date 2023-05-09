import mongoose from "mongoose";

const config=async()=>{
   try {
    await  mongoose.connect('mongodb://localhost/Exam')
    console.log("DataBase Connected.... ");
   } catch (error) {
    console.log("error",error);
   }
}

export default config;
