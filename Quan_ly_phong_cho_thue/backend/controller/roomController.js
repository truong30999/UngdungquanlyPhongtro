const Room = require('../models/Room')
const House = require('../models/House')

exports.createRoom = async (req,res)=>{
    const room = new Room({
        RoomNumber: req.body.RoomNumber,
        Length: req.body.Length,
        Width: req.body.Width,
        Price: req.body.Price,
        Details: req.body.Details,
        Image: req.body.Image,
        HouseId: req.body.HouseId
    })
    
    try{
        const createRoom = await room.save();
        const house= await House.findById({_id : req.body.HouseId})
        house.Rooms.push(room)
        await house.save()
        res.json(createRoom);
    }catch(err){
        res.json({message: err})
    }

}
exports.updateRoom = async (req,res)=>{
    try{
        let room = req.body
        const updateRoom = await Room.updateOne(
            {_id : req.params.roomId},
            {$set: room}
        )
        res.json(updateRoom)
    }catch(err){
        res.json({message: err})
    }
}
exports.getAllRoom = async (req,res)=>{
    try{
        const room = await Room.find()
        res.json(room)
    }catch(err){
        res.json({message: err})
    }

}
exports.getRoomById = async (req,res)=>{
    try{
        const room = await Room.findById(req.params.roomId)
        res.json(room)
    }catch(err){
        res.json({message: err})
    }

}
exports.deleteRoom = async (req, res)=>{
    try{
        const removeRoom = await Room.remove({_id : req.params.roomId})
        res.json(removeRoom)
    }
    catch(err){
        res.json({message: err})
    }
}
