const express = require('express')
const router = express.Router()
const fellowLogin = require('../controllers/fellow/login')
const {fellowRegister, upload} = require('../controllers/fellow/register')
const createPassword = require("../controllers/fellow/create-password")
const resetPassword = require("../controllers/fellow/reset-password")
const updatePassword = require("../controllers/fellow/update-password")
const resetToken = require("../controllers/fellow/confirmResetToken")
const {saveAssessment, getAssessment }= require("../controllers/fellow/saveAssessment")
const {
    getAssignedProjects,
    getCompletedProjects,
    getInProgressProjects,
    getAvailableProjects
} = require("../controllers/fellow/getProject")
const authenticate = require("../middleware/fellow-auth")
const notification = require('../controllers/fellow/notification')


//fellow
router.post('/fellow/login', fellowLogin) 
router.post('/fellow/signup',  fellowRegister) 
router.post('/fellow/create-password', createPassword)
router.post('/fellow/reset-password', resetPassword);
router.post('/fellow/update-password', updatePassword);
router.post('/fellow/confirm-token', resetToken);
router.post('/fellow/assessment', authenticate, saveAssessment)
router.get('/fellow/assigned-project', getAssignedProjects);
router.get('/fellow/completed-project', getCompletedProjects);
router.get('/fellow/in-progress-project', getInProgressProjects);
router.get('/fellow/available-project', getAvailableProjects);
router.get('/fellow/assessment', authenticate, getAssessment)
router.get('/fellow/notification', notification);


module.exports = router;