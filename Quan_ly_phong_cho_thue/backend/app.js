const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
//Start App
const app = express();
app.use(cors());
app.use(bodyParser.json());




//import router
const userRouter = require('./routes/user.js');
const roomRouter = require('./routes/room.js')
const houseRouter = require('./routes/house.js')


app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/house", houseRouter);

//routes
app.get('/',(req,res) => {
    res.send('we are on home');
});
//connect to db

mongoose.connect('mongodb://localhost:27017/test1',{ useNewUrlParser: true }, () => console.log("connect to db success"));

// Launch app to the specified port
app.listen(3000);