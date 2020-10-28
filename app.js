const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const e = require('./exp');

mongoose.connect(e.cs,{ useNewUrlParser: true ,  useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error',(err)=>{console.log(err)});
db.once('open',()=>{ console.log('Connected to the DataBase')});

app.listen(3000, ()=>{console.log('server has started')});

//middlewares



