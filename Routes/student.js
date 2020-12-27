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

//Creating 1
Router.post('/',async(req,res,next)=>
{
    const student = new Student({
        name:req.body.name,
        email:req.body.name,
        password:req.body.password,
        cgpa:req.body.cgpa,
        branch:req.body.branch,
        address:req.body.address,
        phone:req.body.phone,
        tenthMarks:req.body.tenthMarks,
        twelfthMarks:req.body.twelfthMarks,
        dob:req.body.dob,
        gender:req.body.gender,
        diplomaPercentage:req.body.diplomaPercentage,
        semester:req.body.semseter
    })

    try
    {
        const newStudent = await student.save();
        res.status(201).json(newStudent)
    }
    catch(err)
    {
        res.status(400).send({err:err.message})

    }
    
})

//Updating 1
Router.patch('/:id',getStudent,async(req,res,next)=>
{
    if(req.body.name!=null)
    {
        res.student.name = req.body.name;
    }

    try
    {
        const updatedStudent = await res.student.save();
        res.json(updatedStudent)
    }
    catch(err)
    {
        res.json(500).json({message:err.message});
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