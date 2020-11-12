const User = require('../models/User.model')
const crypto = require('crypto');
exports.createUser = async (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt)
        .update(req.body.PassWord)
        .digest("base64");
    req.body.PassWord = salt + "$" + hash;
    req.body.Type = 1;
    
    try {
        const user = new User(req.body)
        const result = await user.save()
        res.json(result)
    } catch (err) {
        res.json({ message: err.message })
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
    try {
        let update = req.body;
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
    try {
        const removeUser = await User.remove({ _id: req.params.userId })
        res.json(removeUser)

    } catch (err) {
        res.json({ message: err })
    }
}
