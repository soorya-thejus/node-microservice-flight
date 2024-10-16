const express = require('express');
const mongoose = require('mongoose');
const airlineroutes=require('./routes/airlineroutes');

const app=express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/flightdb",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB",err);
});
app.use('/',airlineroutes);

app.listen(3001,()=>{
    console.log("Airline service is running on port 3001");
});