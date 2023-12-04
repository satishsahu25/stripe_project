const mongoose=require('mongoose');
require('dotenv').config();



 const connecttoDB=async()=>{
    const dbname="heydaw-assign"
    const configoption={
        useNewURLParser:true,
        useUnifiedTopology:true
    }
       try{
       const conn=await mongoose.connect(process.env.MONGO_URL,{dbname},configoption);
            console.log("Connected to database");
        }catch(err){
        console.log(err);
       }

};
module.exports = connecttoDB;



