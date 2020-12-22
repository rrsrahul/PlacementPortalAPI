const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
const studentSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  semseter:
  {
      type:Number,
      required:true
  },
  cgpa:
  {
      type:String,
      required:true
  },
  tenthPercentage:
  {
      type:String,
      required:true
  },
  twelthPercentage:
  {
      type:String,
      required:true
  },
  address:
  {
      type:String,
  },
  resume:
  {
      type:String
  }

  
});*/

const studentSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,

  },
  password:
  {
    type:String
  },
  cgpa:
  {
    type:String
  },
  branch:
  {
    type:String
  },
  year:
  {
    type:Number
  },
  address:
  {
    type:String
  },
  phone:
  {
    type:String
  }

})

module.exports = mongoose.model('Student', studentSchema);