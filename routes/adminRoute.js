const express = require('express')
const router = express.Router()
const adminRegister = require("../controllers/admin/register")
const adminLogin = require("../controllers/admin/login")
const adminPassword = require("../controllers/admin/admin-password")
const { getProject,  updateProject, createProject} = require("../controllers/admin/newProject")

//admin
router.post('/admin/login', adminLogin) 
router.post('/admin/signup',  adminRegister) 
router.post('/admin/create-password', adminPassword)
/* New Project*/ 
router.post('/admin/new-project/create', createProject)
router.get('/admin/new-project/getproject', getProject)
router.put('/admin/new-project/edit/:id', updateProject)

module.exports = router;

