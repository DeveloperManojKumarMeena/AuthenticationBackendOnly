const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username:String,
    password:String
})

const usermodel = new mongoose.model("userinfo",user);

module.exports=usermodel;