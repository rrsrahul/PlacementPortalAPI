const Company = require('../Models/company');

exports.getCompanies = async(req,res,next)=>
{
    try{
        const companies = await Company.find();
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
            res.status(404).json({message:'Could not find the Company'});

        }
        res.json(company);

    }
    catch(err)
    {
        res.status(500).json({message:err.message});

    }
}