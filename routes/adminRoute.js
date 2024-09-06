const express = require('express')
const router = express.Router()
const adminRegister = require("../controllers/admin/register")
const adminLogin = require("../controllers/admin/login")
const adminPassword = require("../controllers/admin/admin-password")
const { getProject,  updateProject, createProject} = require("../controllers/admin/newProject")

//admin
router.post('/login', adminLogin) 
router.post('/signup',  adminRegister) 
router.post('/create-password', adminPassword)
/* New Project*/ 
router.post('/new-project/create', createProject)
router.get('/new-project/getproject', getProject)
router.put('/new-project/edit/:id', updateProject)

module.exports = router;

