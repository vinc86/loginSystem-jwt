const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const dotenv = require('dotenv').config();
const app = express()

//middlewares
app.use(express.json());
app.use(cors());

//router middlewares
app.use("/users", userRouter)
/* app.use((err,req,res,next)=>{
    res.json({error: err})
    next(err)
}) */
// setup server
const PORT = process.env.PORT || 4000
app.listen(PORT,() => console.log(`Server listening on port: ${PORT}`))

// setup mongoose
mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex: true
    }, (err)=>{
    if (err) throw err;
    console.log("Db Connected")
})