require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();



app.use(express.json());

const studentRouter = require('./Routes/student');
const companyRouter = require('./Routes/company');
const authRouter = require('./Routes/auth');

//Set The Application with these middlewares

app.use(bodyParser.json());


mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true ,  useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error',(err)=>{console.log(err)});
db.once('open',()=>{ console.log('Connected to the DataBase')});

/*
Can also connect to the Database using
process.env gets the variables from the .env while
mongoose.connect(process.env.DATABASE_URL).then((result)=>
{
    app.listen(3000);
}).catch(err=>{
    console.log(err);
})


*/



//Routing 

app.use('/students',studentRouter);
app.use('/companies',companyRouter);
app.use('/admin',authRouter);


app.listen(3000, ()=>{console.log('server has started')});






