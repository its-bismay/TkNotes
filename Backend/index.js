const express = require("express")
const cors = require("cors")
const app = express();
require('dotenv').config();


const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)


const User = require('./models/user.model.js')
const Note = require('./models/notes.model.js')


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

// account creation and login


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


// ADD AND UPDATE NOTES

app.post("/note/add",authenticateToken, async (req,res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    if(!title){
        return res.status(400).json({
            error: true,
            message: "Title is required"
        })
    };

    if(!content){
        return res.status(400).json({
            error: true,
            message: "Content is required"
        })
    };

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id
        })

        await note.save();

        return res.status(200).json({
            error: false,
            message: "Note added successfully",
            note
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        })
    }
})


app.put("/note/edit/:noteId",authenticateToken, async (req,res) => {
    const noteId = req.params.noteId
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if(!title && !content && !tags){
        return res.status(400).json({
            error: true,
            message: "No changes provided"
        })
    };

    try {
        const note = await Note.findOne({_id: noteId, userId: user._id})

        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not found"
            })
        }

        if(title) note.title = title;
        if(content) note.content = content;
        if (tags) note.tags =tags;
        if (isPinned) note.isPinned = isPinned;

        await note.save();

        return res.status(200).json({
            error: false,
            message: "Note updated successfully",
            note
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        })
    }
})

//get all notes

app.get("/notes", authenticateToken, async (req,res) => {
 const { user } = req.user;

 try {
    const notes = await Note.find({userId: user._id}).sort({ isPinned: -1});
    return res.status(200).json({
        error:false,
        notes,
        message: "Notes retrieved successfully"
    })
 } catch (error) {
    return res.status(500).json({
        error: true,
        message: "Internal server Error"
    })
 }
})
//start the server
app.listen(8000, () => {
    console.log("serever is running on port 8000")
});


module.exports = app;