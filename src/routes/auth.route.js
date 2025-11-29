const express = require('express');
const usermodel = require('../model/user.model');
var jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body


    const user = await usermodel.create({
        username, password
    })
    try {
        var token = jwt.sign({ id: user._id }, process.env.JWT_Sceret);

    res.cookie('auth-token', token)

    res.status(200).json({
        message: 'User registered successfully',
        user,
        token
    });
        
    } catch (error) {
        console.log(error)
    }

    
});

router.post('/login', async (req, res) => {

    const { username, password } = req.body;

    const isUser = await usermodel.findOne({ username })
    if (!isUser) {
        return res.status(402).json({
            Message: "User Not Found Pleas Cheak User Name"
        })
    }
    const passkey = password == isUser.password
    if (!passkey) {
        return res.status(402).json({
            Message: "Invalid Password Please Cheak and try again"
        })
    }

    const token = jwt.sign({ id: isUser._id }, process.env.JWT_Sceret)

    res.cookie('auth-token', token)
    res.status(200).json({
        message: "User Login Succussfully and token is",
        token
    })



})


router.get('/userinfo', async (req, res) => {

    const token = req.cookies['auth-token'];
    if (!token) {
        return res.status(402).json({
            Message: "Login Please and try again"
        })
    }


    try {
        const userid = jwt.verify(token, process.env.JWT_Sceret)
        const userinfo = await usermodel.findOne({ _id: userid.id })


        res.status(200).json({
            Message: "cookie mil rha ha",
            userinfo
        })

    } catch (error) {
        console.log(error)
    }



})


module.exports = router;