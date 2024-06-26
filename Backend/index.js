const express = require("express")
const cors = require("cors")
const app = express();
require('dotenv').config();


const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)



app.use(express.json());

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

app.listen(8000, () => {
    console.log("serever is running on port 8000")
});


module.exports = app;