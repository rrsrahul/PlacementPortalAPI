const Applied = require('../Models/Applied');
const mongoose = require('mongoose');
require('dotenv').config();

exports.applyCompany = async(req,res,next)=>
{
    const compName = req.body.compName;
    const userId = mongoose.Types.ObjectId(req.body.id)

    const apply = new Applied({
            name:compName,
         id:userId
    })
     
    try
    {
            const appliedStudent = await apply.save();
            //console.log(appliedStudent);
            res.status(201).json({message:'Applied Successfully',companyName:appliedStudent.name})
    }
    catch(err)
    {
        console.log(err)
    }

}

exports.getStudents = async(req,res,next)=>
{
    const companyName = req.query.name
    
    try
    {
        console.log(companyName)
       const result = await Applied.find({name:companyName})
       console.log(result)
       res.send(result);
      // const result2 = await Applied.find()
       //console.log(result2)
       //res.status(201).json({})
    }
    catch(err)
    {
        console.log(err)
    }
   
}
