const jwt = require('jsonwebtoken');
const userModel = require('../db/models/userModel');

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const verification = (req, res ,next) => {
    if (!TOKEN_SECRET) {
        res.status(400).json({success : false, message : "Token is not present"})
    }

    const token = req.headers["x-access-token"];

    const decodeUser = jwt.verify(token, TOKEN_SECRET);

    req.userId = decodeUser.userId;

   let type = decodeUser.type;

   if (type != 1) {
    res.status(400).json({success : false, message : "You are not authorized"});

   }

   res.status(200).json({success : true, message : "Admin Panel"})
}

module.exports = {
    verification
}