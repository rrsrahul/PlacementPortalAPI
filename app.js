require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const mongoose = require('mongoose');
const multer = require('multer')
const app = express();
const { v4: uuidv4 } = require('uuid');
var cors = require('cors');
app.use(cors());

const studentRouter = require('./Routes/student');
const companyRouter = require('./Routes/company');
const authRouter = require('./Routes/auth');
const applyRouter = require('./Routes/apply');

app.use(express.json());

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4())
  }
});

const fileFilter = (req, file, cb) => {
  console.log(file)
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};




//Set The Application with these middlewares

app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


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
  const status = error.statusCode || 500;
  //console.log('in Error Handler')
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(8080, ()=>{console.log('server has started')});






