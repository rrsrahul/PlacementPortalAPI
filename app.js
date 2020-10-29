require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();


mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true ,  useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error',(err)=>{console.log(err)});
db.once('open',()=>{ console.log('Connected to the DataBase')});

app.listen(3000, ()=>{console.log('server has started')});

//middlewares




