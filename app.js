const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const e = require('./exp');

mongoose.connect(e.cs,{ useNewUrlParser: true ,  useUnifiedTopology: true })
.then(()=>
{
    app.listen(3000, ()=>{console.log('server has started')});
}).catch((err)=>
{
    console.log(err)
});


//middlewares



