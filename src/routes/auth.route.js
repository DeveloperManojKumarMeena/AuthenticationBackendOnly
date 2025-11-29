const express = require('express');
const usermodel= require('../model/user.model');
const { default: mongoose } = require('mongoose');
var jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register',async(req,res)=>{
    const {username ,password} = req.body


    const user = await usermodel.create({
        username ,password
    })

var token = jwt.sign({ id : user._id}, process.env.JWT_Sceret);

res.cookie('auth-token', token)

   res.status(200).json({
        message: 'User registered successfully',
        user,
        token
    });
});

router.post('/login',async(req,res)=>{

})





module.exports = router;