const mongoose = require('mongoose');
 
const userSchema = mongoose.Schema({

    Name: {
        type: String,
        require: true
    },
    Age:{
        type: Number
    },
    Email: {
        type: String
    },
    Phone:{
        type: String
    },
    PassWord: {
        type: String,
        require: true
    },
    Type: {
        type: Number,
        require: true
    }
    
});

module.exports= mongoose.model("Users", userSchema);
