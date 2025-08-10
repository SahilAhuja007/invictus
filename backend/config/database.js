const mongoose =require('mongoose');
require('dotenv').config()

exports.dbconnect=()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{console.log("DB connected successfully")})
    .catch((e)=>{console.log("issue while connecting db"+e)})
}