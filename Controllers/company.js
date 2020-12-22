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
            return res.status(404).json({message:'Could not find the Company'});

        }
        res.json(company);

    }
    catch(err)
    {
        res.status(500).json({message:err.message});

    }
}

exports.createCompany = async(req,res,next)=>
{
    const company = new Company({
        name:req.body.name,
        date:req.body.date,
        jd:req.body.jd,
        package:req.body.package
    })
    try{
        const newCompany = await company.save();
        res.status(201).json(newCompany);
        
    }
    catch(err)
    {
        res.status(400).json({message:err.message});
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
        res.status(500).json({message:err.message});
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
        res.status(500).json({message:err.message});
    }
}