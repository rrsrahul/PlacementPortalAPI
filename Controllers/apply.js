const Applied = require('../Models/Applied');
const Company = require('../Models/company');
const Student = require('../Models/student');
const path = require('path')
const ObjectsToCsv = require('objects-to-csv');
const mongoose = require('mongoose');
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
    console.log('Getting CSV')
    try
    {
        //console.log(companyName)
       const result = await Applied.find({name:companyName,position:position}).populate('id')
        let csvData = [];
        csvData = result.map( student =>{
            return {
                Name:student.id.name,
                USN:student.id.usn,
                Semester:student.id.semester,
                Branch:student.id.branch,
                Email:student.id.email,
                cgpa:student.id.cgpa,
                Address:student.id.address,
                dob:student.id.dob,
                PhoneNo:student.id.phone,
                TenthGrade:student.id.tenthMarks,
                TwelfthMarks:student.id.twelfthMarks,
                DiplomaPercentage:student.id.diplomaPercentage,
                Backlogs:student.id.backlogs,
                BacklogsCleared:student.id.backlogsCleared
            }
        })

        //console.log(csvData)
       const csv = new ObjectsToCsv(csvData);
       let savePath = path.join(__dirname, 'savedData')
       //savePath+=companyName + position +'.csv'
       //console.log(savePath);
       await csv.toDisk('./savedData/'+companyName+position+'.csv')
       res.download('./savedData/'+companyName+position+'.csv')

      
       //res.send(result);
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
    try
    {
         const result = await Applied.findOneAndDelete({name:compName,id:userId,position:position})

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