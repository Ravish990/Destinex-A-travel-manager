const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    phoneNumber:{
        type:String,
        required:true,
        trim:true
    },
    otp:{
        type:String,
        required:true,
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:300
    }
})

module.exports = mongoose.model('OTP', OTPSchema);