const House = require('../models/House.model')

exports.createHouse = async (req, res) => {
    const house = new House({
        Name: req.body.Name,
        Address: req.body.Address,
        Room: req.body.Room
    })
    try {
       
        const createHouse = await house.save()
        res.json(createHouse)
    }catch(err)
    {
        res.json({message: err})
    }
}

exports.getAllHouse = async (req, res) =>{
    try{
        const allHouse = await House.find().populate("Rooms")
        res.json(allHouse)
    }catch(err){
        res.json({message: err})
    }
}
exports.getHouseById = async(req,res)=>{
    try{
        const house = await House.findById(req.params.houseId).populate("Rooms")
        res.json(house)
    }catch(err){
        res.json({message: err})
    }
}
exports.updateHouse = async (req,res)=>{
    try{
        let house = req.body
        const updateHouse = await House.updateOne(
            {_id : req.params.houseId},
            {$set: house}
        )
        res.json(updateHouse)
    }catch(err){
        res.json({message: err})
    }
}
exports.deleteHouse = async (req,res) =>{
    try{
        const removeHouse = await House.remove({_id : req.params.houseId})
        res.json(removeHouse)
    }
    catch(err){
        res.json({message: err})
    }
}

