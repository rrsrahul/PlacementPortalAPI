const Applied = require('../Models/Applied');
const Company = require('../Models/company');
const Student = require('../Models/student');
const mongoose = require('mongoose');
const { json } = require('body-parser');
const { findOneAndRemove } = require('../Models/Applied');
require('dotenv').config();

exports.applyCompany = async(req,res,next)=>
{
    const compName = req.body.compName;
    const userId = mongoose.Types.ObjectId(req.body.id)
    const position = req.body.position

    const apply = new Applied({
            name:compName,
            id:userId,
            position:position
    })
     
    try
    {
        //Finding Company from the database
        const company = await Company.findOne({name:compName,position:position})
        if(!company)
        {
            const error = new Error('Could not Apply to this Company');
            error.statusCode = 401;    
            throw error;
        }

        const student = await Student.findOne({_id:userId})

        if(!student.cgpa)
        {
            const error = new Error('Please Complete Signup Process');
            error.statusCode = 401;
            throw error;

        }
        if(parseFloat(student.cgpa)<parseFloat(company.eligibility))
        {
            const e = new Error('Cgpa is lesser than the Cutoff needed, Try again ')
            e.statusCode = 400
            throw error;
        }

            const appliedStudent = await apply.save();
            //console.log(appliedStudent);
            res.status(201).json({message:'Applied Successfully',companyName:appliedStudent.name,studentName:student.name})
    }
    catch(err)
    {
        console.log(err)
        next(err)
    }

}

exports.getStudents = async(req,res,next)=>
{
    const companyName = req.query.name
    const position = req.query.position
    
    try
    {
        //console.log(companyName)
       const result = await Applied.find({name:companyName,position:position}).populate()
      
       res.send(result);
      // const result2 = await Applied.find()
       //console.log(result2)
       //res.status(201).json({})
    }
    catch(err)
    {   
        
        console.log(err)
        next(err)
    }
   
}

exports.removeCompany = async(req,res,next)=>
{
    const compName = req.body.compName;
    const userId = mongoose.Types.ObjectId(req.body.id)
    const position = req.body.position
    console.log(compName);
    try
    {
         const result = await Applied.findOneAndDelete({name:compName,id:userId,position:position})
         console.log(result)

            if(!result)
            {
                const error = new Error('Cannot Withdraw');
                error.statusCode = 500;    
                throw error;
            }
            res.json({message:'Company Withdrawn'})
    }
    catch(err)
    {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }

}

exports.getCompanies = async(req,res,next)=>
{
    const userId = mongoose.Types.ObjectId(req.query.userId)
    console.log(userId)

    try
    {
        const companies = await Applied.find({id:userId})
        if(companies==null)
        {
            res.json({})
        }

        res.json(companies)
    }
    catch(err)
    {

    }


}