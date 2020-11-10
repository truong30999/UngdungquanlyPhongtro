const mongoose = require('mongoose');
 
const houseSchema = mongoose.Schema({
    Name: { type: String},
    Address: {type: String},
    Rooms:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }]
});

module.exports= mongoose.model("House", houseSchema);
