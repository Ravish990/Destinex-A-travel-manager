const express = require('express');

const app = express();

app.use(express.json());

app.get("/", (req,res) => {
   res.status(200).json({success : true, message : "Server is running "})
})

app.listen(8000, () => {
   console.log("server is running on port 8000")
})
