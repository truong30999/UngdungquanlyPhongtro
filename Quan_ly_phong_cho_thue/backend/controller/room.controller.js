const Room = require('../models/Room.model')
const House = require('../models/House.model')
const Service = require('../models/Services.model')
const jwt = require('jsonwebtoken')
const { json } = require('body-parser')
const mongoose = require('mongoose')


exports.createRoom = async (req, res) => {
    const room = new Room({
        RoomNumber: req.body.RoomNumber,
        Length: req.body.Length,
        Width: req.body.Width,
        Price: req.body.Price,
        Details: req.body.Details,
        Image: req.body.Image,
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
        const removeRoom = await Room.remove({ _id: req.params.roomId })
        res.json(removeRoom)
    }
    catch (err) {
        res.json({ message: err })
    }
}
exports.addPersonToRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId)
        room.ListPerson.push(req.params.customerId)
        const result = await room.save()
        res.json(result)
    } catch (error) {
        res.json({ message: error.message })
    }
}
