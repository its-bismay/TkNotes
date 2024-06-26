const express = require("express")
const cors = require("cors")
const app = express();
require('dotenv').config();


const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)


const User = require('./models/user.model.js')


app.use(express.json());


const jwt = require('jsonwebtoken')
const { authenticateToken } = require('./utils.js')

app.use(
    cors({
        origin: "*"
    })
);

app.get("/", (req, res) => {
    res.json({
        data: "hello world"
    })
});

//Create account

app.post("/register", async(req, res) => {
    const { fullName, email, password } = req.body
    if (!fullName) {
        return res
        .status(400)
        .json({error: true, message: "Full Name is required"})
    }

    if (!email) {
        return res
        .status(400)
        .json({error: true, message: "Email is required"})
    }

    if (!password) {
        return res
        .status(400)
        .json({error: true, message: "Password is required"})
    }


    const isUser = await User.findOne({ email: email})

    if(isUser) {
        return res.status(400).json({error: true, message: "User with this email already exist."})
    }

    const user = new User({
        fullName,
        email,
        password,
    })

    await user.save();

    const accessToken = jwt.sign({ user}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn:"3600m",
    }) 


    return res.status(200).json({
        error: false,
        user,
        accessToken,
        message: "User registered successfully"
    })
})


app.post("/login", async(req,res) => {
    const { email, password } = req.body

    if (!email) {
        return res
        .status(400)
        .json({error: true, message: "Email is required"})
    }

    if (!password) {
        return res
        .status(400)
        .json({error: true, message: "Password is required"})
    }

    const userInfo = await User.findOne({ email: email});

    if(!userInfo) {
        return res.status(400).json({error: true, message: "User not found"})
    }

    if (userInfo.email == email && userInfo.password == password){
        const user = {user: userInfo};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn:"3600m",
        });

        return res.status(200).json({
            error: false,
            message: "Logged in successfully",
            user,
            accessToken
        })
    } else {
        return res.status(400).json({
            error: true,
            message: "Invalid Credentials"
        })
    }
})
app.listen(8000, () => {
    console.log("serever is running on port 8000")
});


module.exports = app;