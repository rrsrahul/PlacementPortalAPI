const Student = require('../Models/student');
const bcrypt = require('bcryptjs');
const { load } = require('dotenv/types');

exports.signup = async(req,res,next)=>
{
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
try
{
    const hashedpw = await bcrypt.hash(password,12);
    const student = new Student({
        name:name,
        email:email,
        password:hashedpw
    })

    const result = await student.save();
    res.status(201).json({message:'Student Created',...result});

}
catch(err)
{
    return res.json({message:err.message});
}
   
}

exports.login = async(req,res,next)=>
{
    const email = req.body.email;
    const password = req.body.password;
    let loadedStudent;
    try
    {
        const student = await Student.find({email:email});
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
            'supersupersecretkey',
            {expiresIn: '1h' }

        );

        res.status(200).json({ token: token, userId: loadedStudent._id.toString() });

    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
}