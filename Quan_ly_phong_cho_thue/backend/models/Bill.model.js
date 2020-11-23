const mongoose = require('mongoose');
 
const billSchema = mongoose.Schema({
    RoomId: { type: mongoose.Schema.Types.ObjectId, required: true },
    RoomNumber:{type :Number},
    ElectricCost: {type: Number},
    WaterCost: {type: Number},
    RoomPrice: {type: Number},
    TotalBill: {type: Number},
    DateCreate:{type: Date},
    OtherCosts:{type: String}
});

module.exports= mongoose.model("Bill", billSchema);
