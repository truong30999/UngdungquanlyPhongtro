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
    const room = await Room.findById(req.body.RoomId)
    room.ListUtilityBill.push(result[_id])
    room.save()
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
    try {
        if(req.query.Month)
        {
            const list = await House.find({UserId: req.query.UserId, _id: req.query.HouseId})
            .populate({
                path: 'Rooms',
                populate: { path: 'ListBill', match: { StartDate: req.query.Month }
              }})
              return   res.json(list)
        }
            const month = new Date(today.getFullYear(), today.getMonth())
            const list = await House.find({ _id: req.query.HouseId , UserId: req.query.UserId})
            .populate({
                path: 'Rooms',
                populate: { path: 'ListBill', match: { StartDate: month }
              }})
            console.log(list)
            res.json(list)
        
      
    } catch (error) {
        res.json({ message: error.message })
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
