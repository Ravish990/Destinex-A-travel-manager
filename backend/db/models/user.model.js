const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    phoneNumber:{
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    userName:{
        type: String,
        required: true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minLength:8,
    },
    dob:{
        type:Date,
        required:true
    }
},
{timestamps:true}
);

module.exports = mongoose.model('User', userSchema);