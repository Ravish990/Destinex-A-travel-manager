const express = require('express');
const { connectDb }= require('./db/connection');
const userRouter = require('./routes/auth.route')
const cors = require("cors")
const dotenv = require('dotenv');
const bookingRouter = require('./routes/bookingRoutes')
const hotelRouter = require('./routes/hotelRoutes')
const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
connectDb();
app.get("/", (req,res) => {
   res.status(200).json({success : true, message : "Server is running "})
})
app.use('/user', userRouter);

app.use('/destination', require('./routes/destinationRoutes'));

app.use('/booking', bookingRouter);

app.use('/hotel', hotelRouter);

app.listen(process.env.PORT, () => {
   console.log(`Server is Running on http://localhost:${process.env.PORT}`);
})
