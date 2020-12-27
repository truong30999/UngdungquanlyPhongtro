const UtilityBill = require('../models/Utilitybills.model')
const Room = require('../models/Room.model')
exports.createUtilityBills = async(req, res) => {
    try{
        
    const ult = new UtilityBill({
        Time : req.body.Time,
        ElectricNumber : req.body.ElectricNumber,
        WaterNumber : req.body.WaterNumber,
        RoomId : req.body.RoomId
    })
    const result = await ult.save()
    res.json(result)


    }
    catch (err) { 
        res.json({ message: err})
    }


}
exports.getAllUtilityBills = async (req, res) =>{
    try{
        const ult = await UtilityBill.find()
        res.json(ult)

    }catch (err) {
        res.json({ message: err})
    }

}
exports.getAllUtilityByRoom = async (req, res) =>{
    try{
        //const ult = await UtilityBill.find({RoomId : req.query.roomId})
        console.log(req.query.RoomId)
        const ult = await UtilityBill.aggregate([
            {
                $match: { 
                    RoomId: req.query.RoomId
                } 
            },
            // {
            //     $lookup:{
            //         from: 'rooms',
            //         localField: 'RoomId',
            //         foreignField: '_id',
            //         as: 'abc'
                    
            //     }
            // }
        ])
        console.log(ult)
        
        res.json(ult)

    }catch (err) {
        res.json({ message: err})
    }

}
exports.getById = async (req, res) => {
    try{
        const ult = await UtilityBill.findById(req.params.Id)
        res.json(ult)

    }catch (err) {
        res.json({ message: err})
    }

}
exports.update = async (req, res) =>{
    try{
        const update = req.body
        const result =  await UtilityBill.updateOne(
            {_id: req.params.Id},
            {$set: update}
        );
        res.json(result)
    }catch (err) {
        res.json({ message: err})
    }
}
exports.delete = async (req, res) => {
    try{
        const result =  await UtilityBill.remove({ _id:req.params.Id})
        res.json(result)
    }catch (err) {
        res.json({ message: err.message})
    }
}
