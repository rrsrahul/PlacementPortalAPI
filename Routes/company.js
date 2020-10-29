const express = require('express');

const Router = express.Router();

const companyController = require('../Controllers/company');


//Get All Companies
Router.get('/',companyController.getCompanies);

//Get 1 Company
Router.get('/:id',companyController.getCompany);
/*
//Create Company
Router.post('/',companyController.createCompany);

//Update Company
Router.patch('/:id',companyController.updateCompany);

//Delete Company
Router.delete('/:id',companyController.deleteCompany);
*/
module.exports = Router;