const User = require('../models/User.model')
const Service = require('../models/Services.model')
const crypto = require('crypto')
const fs = require('fs');
const  nodemailer = require('nodemailer');


exports.createUser = async (req, res, next) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt)
        .update(req.body.PassWord)
        .digest("base64");
    req.body.PassWord = salt + "$" + hash;
    req.body.Type = 1;

    try {
        const user = new User({
            Name: req.body.Name,
            Image: req.file.path,
            Age: req.body.Age,
            Email: req.body.Email,
            Phone: req.body.Phone,
            PassWord: req.body.PassWord,
            Type: req.body.Type,
            Status: 1
        })
        const result = await user.save()
        createService(result["_id"])
        res.json(result)
    } catch (err) {
        res.json({ message: err.message })
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }

}
exports.register = async (req, res) => {
    try {
        const user = await User.findOne({ Email: req.body.Email })
        if (user) {
            res.json({ message: "Email already exist!" })
        } else {
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt)
                .update(req.body.PassWord)
                .digest("base64");
            req.body.PassWord = salt + "$" + hash;
            req.body.Type = 1;
            const user = new User({
                Email: req.body.Email,
                PassWord: req.body.PassWord,
                ActiveCode: getRandomInt(1000, 10000),
                Type: req.body.Type,
                Status: 0
            })
            

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'truongnguyen30999test@gmail.com',
                    pass: 'Khang250904'
                }
            });
            var link = "http://localhost:8080/verify/?email="+user.Email+"&activeId="+ user.ActiveCode
            var mailOptions = {
                from: 'truongnguyen30999test@gmail.com',
                to: user.Email,
                subject: 'Verify email register',
                html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            const result = await user.save()
            res.json(result)
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}
exports.getAllUser = async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }

}
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
}
exports.updateUser = async (req, res) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }
    const user = await User.findById(req.params.userId)
    if (user.Image && req.file) {
        fs.unlink(user.Image, err => {
            console.log(err.message);
        });
    }

    if (req.file) { req.body.Image = req.file.path }
    let update = req.body;
    try {

        const updatedUser = await User.updateOne(
            { _id: req.params.userId },
            { $set: update }

        );
        res.json(updatedUser);
    } catch (err) {
        res.json({ message: err });
    }

}
exports.deleteUser = async (req, res) => {
    const user = await User.findById(req.params.userId)
    if (user.Image) {
        fs.unlink(user.Image, err => {
            console.log(err);
        });
    }
    try {
        const removeUser = await User.remove({ _id: req.params.userId })
        res.json(removeUser)

    } catch (err) {
        res.json({ message: err })
    }
}
const createService = async (userId) => {
    const service1 = new Service({
        ServiceName: "Điện",
        Description: "Tiền điện",
        Price: 3000,
        UserId: userId
    })
    const service2 = new Service({
        ServiceName: "Nước",
        Description: "Tiền Nước",
        Price: 10000,
        UserId: userId
    })
    const service3 = new Service({
        ServiceName: "Rác",
        Description: "Tiền rác hàng tháng",
        Price: 3000,
        UserId: userId
    })
    await service1.save()
    await service2.save()
    await service3.save()
}
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};