const mongoose=require('mongoose');
require('dotenv').config();

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.DB_HOST);
        console.log("MongoDB connected");
    }
    catch(err){
        console.log(err.message);
    }
};
module.exports=connectDB;
