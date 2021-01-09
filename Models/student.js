const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,

  },
  usn:{
    type:String
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
  address:
  {
    type:String
  },
  phone:
  {
    type:String
  },
  tenthMarks:{
    type:String
  },
  twelfthMarks:{
    type:String
  },
  dob:{
    type:String
  },
  gender:{
    type:String
  },
  diplomaPercentage:{
    type:String
  },
  semester:
  {
      type:Number,   
  },
  backlogs:{
    type:String
  },
  backlogsCleared:{
    type:String
  },
  resume:
  {
    type:String
  },
  imageUrl:
  {
    type:String
  }
})

module.exports = mongoose.model('Student', studentSchema);