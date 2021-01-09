const express = require('express')

const Router = express.Router();
const applyController = require('../Controllers/apply');

//Apply
Router.post('/',applyController.applyCompany)

//Get all Students registered for a company

Router.get('/company',applyController.getStudents)

Router.get('/student',applyController.getCompanies)

Router.post('/withdraw',applyController.removeCompany)


module.exports = Router;