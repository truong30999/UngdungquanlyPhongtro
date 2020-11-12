const User = require('../models/User')

exports.createUser = async(req, res)=>{
    const user = new User({
        Name: req.body.Name,
        Age: req.body.Age,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Type: req.body.Type
    });

    try
    {
        const savedUser = await user.save();
        res.json(savedUser);
    }catch(err){
        res.json({message: err});
    }


}

exports.getAllUser = async (req,res)=>{
    try{
        const user = await User.find();
        res.json(user);
    }catch(err){
        res.json({message:err});
    }

}
exports.getUserById = async (req,res) =>
{
    try{
        const user = await User.findById(req.params.userId);
        res.json(user);
    }catch(err){
        res.json({message: err});
    }
}
exports.updateUser = async (req, res)=>{
    try{
        let update = req.body;
        const updatedUser = await User.updateOne(
            {_id: req.params.userId},
            {$set:update}
            );
            res.json(updatedUser);
    }catch(err){
        res.json({message: err});
    }

}
exports.deleteUser = async (req,res)=>{
    try{
        const removeUser = await User.remove({_id : req.params.userId })
        res.json(removeUser)

    }catch(err){
        res.json({message : err})
    }
}
