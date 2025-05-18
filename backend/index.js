const express = require('express');
const { connectDb }= require('./db/connection');
const userRouter = require('./routes/auth.route')
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/user', userRouter);

app.listen(process.env.PORT, () => {
   console.log(`Server is Running on http://localhost:${process.env.PORT}`);
   connectDb();
})
