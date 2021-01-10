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
        if(password.length<7)
        {
            const error = new Error('Password too short');
            error.statusCode = 401;    
            throw error;
        }
        if(!student)
        {
            const error = new Error('Wrong Email or Password');
            error.statusCode = 404;    
            throw error;

        }
        loadedStudent = student;
        const isEqual = await bcrypt.compare(password, student.password);
        if(!isEqual)
        {
            const error = new Error('Wrong Email or Password');
            error.statusCode = 400;    
            throw error;
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
            userData:{...loadedStudent._doc,password:null},
            isAdmin:loadedStudent._doc.isAdmin
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