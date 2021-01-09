const Company = require('../Models/company');

exports.getCompanies = async(req,res,next)=>
{
    try{
        const companies = await Company.find().sort({date:'asc'});
        res.status(200).json(companies)
    }
    catch(err){
        res.status(500).json({message:err.message});

    }
}

exports.getCompany = async(req,res,next)=>
{
    try{
        const company = await Company.findById(req.params.id);
        if(company==null)
        {
            return res.status(404).json({message:'Could not find the Company'});

        }
        res.json(company);

    }
    catch(err)
    {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);

    }
}

exports.createCompany = async(req,res,next)=>
{


    const company = new Company({
        name:req.body.name,
        eligibility:req.body.eligibility,
        ctc:req.body.ctc,
        date:req.body.date,
        position:req.body.position,
        jd:req.body.jd,
        internship:req.body.internship,
        jobLocation:req.body.jobLocation,
        additionalInformation:req.body.additionalInformation
    })
    try{

        const comp = await Company.findOne({ name:req.body.name,position:req.body.position });
        if (comp) {
            const error = new Error('A Company with this Name and Job Description Already exists already exists');
            error.statusCode = 401;    
            throw error;
    }


        const newCompany = await company.save();
        res.status(201).json(newCompany);
        
    }
    catch(err)
    {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }

}

exports.updateCompany = async(req,res,next)=>
{
    const id = req.params.id;
    
    try{
        const company = await Company.findById(id);
        if(company==null)
        {
            return res.status(404).json({message:'Could not find the Company'});
        }
        company.name = req.body.name;
        const updatedCompany = await company.save();
        res.json(updatedCompany);

    }
    catch(err)
    {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }

}

exports.deleteCompany = async(req,res,next)=>
{
    const id = req.params.id;
    try
    {
        const company = await Company.findById(id);
        if(company==null)
        {
            return res.status(404).json({message:'Company not Found'});
        }
        //await Company.findByIdAndRemove(id);
        await Company.findOneAndDelete(id);
        res.json({message:'Deleted the Company',name:company.name});
        
        
    }
    catch(err)
    {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }
}