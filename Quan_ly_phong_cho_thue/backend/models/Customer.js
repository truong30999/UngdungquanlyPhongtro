const mongoose = require('mongoose');
 
const customerSchema = mongoose.Schema({

    Name: {
        type: String,
        require: true
    },
    Age: { type: Number},
    DateOfBirth: { type: Date},  
    Phone: { type: String},
    Email: { type: String},
    PermanentAddress:{
        type: String,
        require: true
    },
    Cmnd: { type: String, require: true},
    DateCmnd: { type: Date},
    PlaceCmnd: {type: String},
    Image : { type: String}
    
});

module.exports= mongoose.model("Customers", customerSchema);
