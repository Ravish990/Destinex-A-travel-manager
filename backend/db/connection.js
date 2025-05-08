const mongoose = require('mongoose');

require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

const connectDb = () => mongoose.connect(MONGO_URI).then(() => {
    console.log("mongodb is connected");
})

module.exports = {connectDb};
