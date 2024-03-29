const Room = require('../models/Room.model')
const House = require('../models/House.model')
const Service = require('../models/Services.model')
const Customer = require('../models/Customer.model')
const config = require('../config/config')
const common = require('../utility/common')

exports.createRoom = async (req, res) => {
    let imgArr= common.convertArrImage(req.files)
    console.log(imgArr)
    const room = new Room({
        RoomNumber: req.body.RoomNumber,
        Length: req.body.Length,
        Width: req.body.Width,
        Price: req.body.Price,
        Details: req.body.Details,
        Image: imgArr,
        HouseId: req.body.HouseId,
        Status: 0
    })   
    try {
        const service = await Service.find({ UserId: req.jwt.userId }, { _id: 1 })

        for (const id in service) {
            room.ListService.push(service[id]["_id"])

        }
        const createRoom = await room.save();
        const house = await House.findById({ _id: req.body.HouseId })
        house.Rooms.push(createRoom)
        await house.save()
        res.json(createRoom)

    } catch (err) {
        res.json({ message: err.message })
    }

}
exports.updateRoom = async (req, res) => {
    try {
        let room = req.body
        const updateRoom = await Room.updateOne(
            { _id: req.params.roomId },
            { $set: room }
        )
        res.json(updateRoom)
    } catch (err) {
        res.json({ message: err })
    }
}
exports.getAllRoom = async (req, res) => {
    try {
        const room = await Room.find()
        res.json(room)
    } catch (err) {
        res.json({ message: err })
    }

}

exports.getRoomByHouse= async (req, res)=>{
    try {
        const room = await Room.find({HouseId:req.params.houseId})
        res.json(room)
    } catch (err) {
        res.json({ message: err })
    }


}
exports.getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId)
        res.json(room)
    } catch (err) {
        res.json({ message: err })
    }

}
exports.deleteRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId)
        const house = await House.findById(room.HouseId)
        const pos =  house.Rooms.indexOf(req.params.roomId)
        house.Rooms.splice(pos,1)
        house.save()
        const removeRoom = await Room.remove({ _id: req.params.roomId })

        res.json(removeRoom)
    }
    catch (err) {
        res.json({ message: err })
    }
}
//them mot nguoi vao phong
exports.addPersonToRoom = async (req, res) => {
    try {
        
        const room = await Room.findById(req.params.roomId)
        const customer = await Customer.findById(req.params.customerId)
        if(customer.RoomId === "" || !customer.RoomId){
            customer.RoomId = room._id
        }
        else{
            return res.json({ err: "Người dùng đã được thêm vào phòng" })
        }
        customer.save()
        if(room.ListPerson.length === 0 )
        {
            room.Status = 1
        }
        room.ListPerson.push(req.params.customerId)

        const result = await room.save()
        res.json(result)
    } catch (error) {
        res.json({ message: error.message })
    }
}
//xoa mot nguoi khoi phong
exports.removePersonToRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId)
        const pos =  room.ListPerson.indexOf(req.params.customerId)
        room.ListPerson.splice(pos, 1)
        if(room.ListPerson.length === 0 )
        {
            room.Status = 0
        }
        const customer = await Customer.findById(req.params.customerId)
        customer.RoomId = ""
        await customer.save()
        const result = await room.save()
        res.json(result)
    } catch (error) {
        res.json({ message: error.message })
    }
}
//them mot dich vu vao phong
exports.addServiceToRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId)
        room.ListService.push(req.params.serviceId)
        const result = await room.save()
        res.json(result)
    } catch (error) {
        res.json({ message: error.message })
    }
}
//xoa mot nguoi khoi phong
exports.removeServiceToRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId)
        const pos =  room.ListService.indexOf(req.params.serviceId)
        room.ListService.splice(pos, 1)
        const result = await room.save()
        res.json(result)
    } catch (error) {
        res.json({ message: error.message })
    }
}

//lay tat ca nguoi trong phong
exports.getPersonInRoom = async(req,res)=>{
    try {
        const room = await Room.findOne({_id : req.params.roomId}).populate("ListPerson")
        const person = room["ListPerson"]
        res.json(person)


    } catch (error) {
        res.json({message: error.message})
    }
}
//lay tat ca dich vu cua phong
exports.getServideOfRoom = async(req,res)=>{
    try {
        const room = await Room.findOne({_id : req.params.roomId}).populate("ListService")
        const service = room["ListService"]
        res.json(service)


    } catch (error) {
        res.json({message: error.message})
    }
}

exports.getEmptyRoom = async(req,res)=>{
    try {
        
        const house = await House.find({UserId: req.jwt.userId})
        .populate({
            path: 'Rooms',
            match: { Status: 0 }
          })
          let roomNumber = 0;
          house.forEach(h=>{
              roomNumber +=  h.Rooms.length
          })
        res.json({ AmountOfRoom: roomNumber})
    } catch (error) {
        res.json({message: error.message})
    }
}
exports.getNotEmptyRoom = async(req,res)=>{
    try {
        const house = await House.find({UserId: req.jwt.userId})
        .populate({
            path: 'Rooms',
            match: { Status: 1 }
          })
          let roomNumber = 0;
          house.forEach(h=>{
              roomNumber +=  h.Rooms.length
          })
        res.json({ AmountOfRoom: roomNumber})
    } catch (error) {
        res.json({message: error.message})
    }
}
