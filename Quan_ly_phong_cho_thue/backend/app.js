const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config/config")
const fs = require('fs');
const path = require('path');
//Start App

const app = express();
app.use(cors());
app.use(bodyParser.json());

//import router
const userRouter = require('./routes/user.routes.js');
const roomRouter = require('./routes/room.routes.js')
const houseRouter = require('./routes/house.routes.js')
const authRouter = require('./routes/auth.routes.js')
const customerRouter = require('./routes/customer.routes.js')
//kiểm tra loi file
app.use((error, req, res, next) => {
    if (req.file) {
      fs.unlink(req.file.path, err => {
        console.log(err);
      });
    }
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
  });
app.use('/uploads/images', express.static(path.join('uploads', 'images')))
app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/house", houseRouter);
app.use("/auth", authRouter);
app.use("/customer", customerRouter)

//routes
app.get('/',(req,res) => {
    res.send('we are on home');
});
//connect to db

mongoose.connect('mongodb://localhost:27017/test1',{ useNewUrlParser: true }, () => console.log("connect to db success"));

// Launch app to the specified port
app.listen(config.port);