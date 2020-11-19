const User = require('../models/User.model')
const crypto = require('crypto')
const fs = require('fs');
exports.createUser = async (req, res, next) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt)
        .update(req.body.PassWord)
        .digest("base64");
    req.body.PassWord = salt + "$" + hash;
    req.body.Type = 1;
    
    try {
        const user = new User({
            Name : req.body.Name,
            Image : req.file.path, 
            Age : req.body.Age,
            Email: req.body.Email,
            Phone: req.body.Phone,
            PassWord: req.body.PassWord,
            Type: req.body.Type
        })
        const result = await user.save()
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
    if (req.body.password){
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
        }
        const user = await User.findById( req.params.userId)
        if (user.Image && req.file) {
            fs.unlink(user.Image, err => {
                console.log(err.message);
            });
        }
    
        if(req.file)
        { req.body.Image = req.file.path}
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
    const user = await User.findById( req.params.userId)
    if(user.Image)
    {
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
