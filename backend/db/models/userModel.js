const mongoose = require('mongoose');

userModel = mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type : String, 
        required : true
    },
    dob : {
        type : Date,
        required : true
    },
    number : {
        type : Number,
        required : true,
    },
    createdAt: {
        type : Date,
        date : Date.now()
    }


    
})

module.exports = mongoose.model("Users", userModel);