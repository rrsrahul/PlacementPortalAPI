const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    date:
    {
        type:Date
    },
    jd:
    {
        type:String
    },
    package:
    {
        type:String
    }
    
})

module.exports = mongoose.model('Company',companySchema);