const express = require('express');

const Router = express.Router();
const Student = require('../Models/student');


//Dealing with one student ID
const getStudent = async(req,res,next)=>
{
    let student;

    try{

        student = await Student.findById(req.params.id);
        if(student==null)
        {
            return res.status(404).json({message:'Could not find Student'});
        }

    }
    catch(err)
    {
        //console.log(err);
        console.log('In get student')
        return res.status(500).json({message:err.message})
        

    }
    res.student = student;
    next();
}




//Getting all Students
Router.get('/', async (req,res,next)=>
{
    try{
        const students =await Student.find();
        res.json(students);
    }
    catch(err)
    {
        res.status(500).send({err:err.message})
    }

})
//Getting 1 Student
Router.get('/:id',getStudent,(req,res,next)=>
{
    const id = req.params.id;
    res.json(res.student);
})

//Updating 1
Router.post('/:id',getStudent,async(req,res,next)=>
{

    if (!req.file) {
        const error = new Error('No image provided.');
        error.statusCode = 422;
        throw error;
      }
    res.student.name =req.body.name
    res.student.cgpa=req.body.cgpa,
    res.student.branch=req.body.branch,
    res.student.address=req.body.address,
    res.student.phone=req.body.phone,
    res.student.tenthMarks=req.body.tenthMarks,
    res.student.twelfthMarks=req.body.twelfthMarks,
    res.student.dob=req.body.dob,
    res.student.gender=req.body.gender,
    res.student.diplomaPercentage=req.body.diplomaPercentage,
    res.student.semester=req.body.semseter
    res.student.imageUrl = req.file.path
    console.log(req.file.path)

    try
    {
        const updatedStudent = await res.student.save();
        res.json(updatedStudent)
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:err.message});
    }
    
})

//Deleting 1
Router.delete('/:id',getStudent,async(req,res,next)=>
{
    try{
            await res.student.remove();
            res.json({message:'Deleted User'});
    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }
    
})



module.exports = Router;