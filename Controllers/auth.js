const Student = require('../Models/student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async(req,res,next)=>
{
    const email = req.body.email;
    const name = req.body.name || 'Rahul';
    const password = req.body.password;
try
{

    const st = await Student.findOne({email:req.body.email})
    if(st)
    {
        const error = new Error('A User with this username already exists');
        error.statusCode = 401;    
        throw error;
    }

    const hashedpw = await bcrypt.hash(password,12);
    const student = new Student({
        name:name,
        email:email,
        password:hashedpw
    })

    const result = await student.save();
    res.status(201).json({message:'Student Created',name:result.name});

}
catch(err)
{
    if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
}
   
}

exports.login = async(req,res,next)=>
{
    const email = req.body.email;
    const password = req.body.password;
    let loadedStudent;
    try
    {
        const student = await Student.findOne({email:email});
        if(!student)
        {
            res.status(404).json({message:'Could not Find User'});

        }
        loadedStudent = student;
        const isEqual = await bcrypt.compare(password, student.password);
        if(!isEqual)
        {
            res.status(400).json({message:'Passwords not matching'});
        }
        const token = jwt.sign(
            {
                email:email,
                userId:loadedStudent._id.toString()
            },
            process.env.SECRET,
            {expiresIn: '1h' }

        );

        res.status(200).json({ token: token, userId: loadedStudent._id.toString(),
            userData:{...loadedStudent._doc,password:null}
         });

    }
    catch(err)
    {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }
}