const express = require('express')

const Router = express.Router();
const applyController = require('../Controllers/apply');

//Apply
Router.post('/',applyController.applyCompany)

//Get all Students registered for a company

Router.get('/',applyController.getStudents)



module.exports = Router;