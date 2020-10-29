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