const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    eligibility:{
        type:String,
        required:true
    },
    ctc:{
        type:String,
    },
    internship:{
        type:String
    },
    jobLocation:{
        type:String
    },
    date:
    {
        type:Date
    },
    jd:
    {
        type:String
    },
    additionalInformation:{
        type:String
    },
    position:{
        type:String
    }
    
})

module.exports = mongoose.model('Company',companySchema);