const userModel = require('../db/models/userModel')

const createUser = async(req, res) => {
    const {name, email, dob, number} = req.body;

    const check = userModel.findOne({email : req.body.email});

    if (check) {
        res.status(400).json({success : false, message : "user already exist"});
    }

    const newUser = {
        name : name,
        email : email,
        dob : dob,
        number : number
    }

    await userModel.insertOne(newUser);

    res.status(200).json({success : true, message : "user created"});
}


module.exports = {
    createUser
}