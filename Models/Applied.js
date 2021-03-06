const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appliedSchema = mongoose.Schema({
    name:{
        type:String
    },
    id:{
        type: Schema.Types.ObjectId,
        ref:'Student',
        required:true
    },
    position:{
        type:String
    }
})




module.exports = mongoose.model('Applied', appliedSchema);