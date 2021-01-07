require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const mongoose = require('mongoose');
const app = express();
var cors = require('cors');
app.use(cors());



app.use(express.json());

const studentRouter = require('./Routes/student');
const companyRouter = require('./Routes/company');
const authRouter = require('./Routes/auth');
const applyRouter = require('./Routes/apply');

//Set The Application with these middlewares

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

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


//Adding static serving on images
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

//Routing 

app.use('/students',studentRouter);
app.use('/companies',companyRouter);
app.use('/admin',authRouter);
app.use('/apply',applyRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(8080, ()=>{console.log('server has started')});






