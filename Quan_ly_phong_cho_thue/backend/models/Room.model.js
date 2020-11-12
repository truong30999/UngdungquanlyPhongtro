const mongoose = require('mongoose');
 
const roomSchema = mongoose.Schema({

    RoomNumber:{
        type: Number,
        require : true,
    },
    HouseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"House"
    },
    Length: {
        type: Number
    },
    Width: {
        type: Number
    },
    Price:{
        type: Number,
        require : true
    },
    Details:{
        type: String
    },
    Image: {
        type: String
    }
});

module.exports= mongoose.model("Room", roomSchema);

