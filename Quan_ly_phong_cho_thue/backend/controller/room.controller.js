const Room = require('../models/Room.model')
const House = require('../models/House.model')
const Service = require('../models/Services.model')
const Customer = require('../models/Customer.model')
const mongoose = require('mongoose')


exports.createRoom = async (req, res) => {
    const room = new Room({
        RoomNumber: req.body.RoomNumber,
        Length: req.body.Length,
        Width: req.body.Width,
        Price: req.body.Price,
        Details: req.body.Details,
        Image: req.file.path,
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
        customer.RoomId = room._id
        customer.save()
        if(room.ListPerson.Length === 0 )
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
        const customer = await Customer.findById(req.params.customerId)
        customer.RoomId = ""
        customer.save()
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

// exports.getUtilityBillOfRoom = async(req, res)=>{
//     try {
//         const house = await House.findOne({_id : req.params.houseId}).populate({
//             path: 'Rooms',
//             populate: { path: '' }
//           });
//         res.json(service)


//     } catch (error) {
//         res.json({message: error.message})
//     }

// }

exports.getEmptyRoom = async(req,res)=>{
    try {
        const room = await Room.find({ Status : 1})
        
        res.json(room)


    } catch (error) {
        res.json({message: error.message})
    }
}
exports.getNotEmptyRoom = async(req,res)=>{
    try {
        const room = await Room.find({ Status : 0})
        
        res.json(room)


    } catch (error) {
        res.json({message: error.message})
    }
}
