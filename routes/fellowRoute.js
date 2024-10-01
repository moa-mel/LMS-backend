/**
 * @swagger
 * components:
 *   schemas:
 *     Fellow:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Fellow
 *         firstName:
 *           type: string
 *           description: The first name of the Fellow
 *         lastName:
 *           type: string
 *           description: The last name of the Fellow
 *         email:
 *           type: string
 *           description: The email of the Fellow
 *         role:
 *           type: string
 *           description: The role of the Fellow
 *         portfolio:
 *           type: string
 *           description: The portfolio URL of the Fellow
 *         linkedIn:
 *           type: string
 *           description: The LinkedIn profile URL of the Fellow
 *         github:
 *           type: string
 *           description: The GitHub profile URL of the Fellow
 *         dribble:
 *           type: string
 *           description: The Dribble profile URL of the Fellow
 *         behance:
 *           type: string
 *           description: The Behance profile URL of the Fellow
 *         fellowCV:
 *           type: string
 *           description: The CV of the Fellow (stored as a public ID from the image upload)
 *         password:
 *           type: string
 *           description: The hashed password of the Fellow
 *         verificationToken:
 *           type: string
 *           description: The verification token for password reset
 *         verificationTokenTTL:
 *           type: string
 *           format: date-time
 *           description: The expiration time for the verification token
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the Fellow was created
 */
/**
 * @swagger
 * tags:
 *   name: Fellows
 *   description: API for managing Fellows
 * /api/fellow/signup:
 *   post:
 *     summary: Register a new Fellow
 *     tags: [Fellows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fellow'
 *     responses:
 *       200:
 *         description: Fellow registration successful, email sent for password creation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Operation status
 *                 message:
 *                   type: string
 *                   description: Registration message
 *                 token:
 *                   type: string
 *                   description: Token for password creation
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 * /api/fellow/login:
 *   post:
 *     summary: Fellow login
 *     tags: [Fellows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the Fellow
 *               password:
 *                 type: string
 *                 description: The password of the Fellow
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation error or invalid credentials
 *       500:
 *         description: Internal server error
 * /api/fellow/create-password:
 *   post:
 *     summary: Create password for a Fellow
 *     tags: [Fellows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: New password
 *               confirmPassword:
 *                 type: string
 *                 description: Confirm new password
 *     responses:
 *       200:
 *         description: Password created successfully
 *       400:
 *         description: Validation error or token issues
 *       500:
 *         description: Internal server error
 * /api/fellow/reset-password:
 *   post:
 *     summary: Reset password for a Fellow
 *     tags: [Fellows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the Fellow
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *       400:
 *         description: Fellow not found
 *       500:
 *         description: Internal server error
 * /api/fellow/assessment:
 *   post:
 *     summary: Save assessment results for a Fellow
 *     tags: [Fellows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: Type of assessment (generalTest, skillTest, interview)
 *               result:
 *                 type: string
 *                 description: Result of the assessment (pass, fail)
 *     responses:
 *       200:
 *         description: Assessment state updated successfully
 *       400:
 *         description: Invalid type or result
 *       500:
 *         description: Internal server error
 
 * /api/fellow/update-password:
 *   post:
 *     summary: Update password for a Fellow
 *     tags: [Fellows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Validation error or mismatched passwords
 *       404:
 *         description: Fellow not found
 *       500:
 *         description: Internal server error
 *
  * /api/fellow/notification:
 *   get:
 *     summary: Get project status notifications
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Project status notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 availableProjects:
 *                   type: integer
 *                   description: Number of available projects
 *                 assignedProjects:
 *                   type: integer
 *                   description: Number of assigned projects
 *                 inProgressProjects:
 *                   type: integer
 *                   description: Number of in-progress projects
 *       500:
 *         description: Internal server error
 * 
 * /api/fellow/assigned-project:
 *   get:
 *     summary: Get assigned projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: A list of assigned projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Project ID
 *                   projectName:
 *                     type: string
 *                     description: Name of the project
 *                   projectStatus:
 *                     type: string
 *                     description: Status of the project
 *                   userName:
 *                     type: string
 *                     description: Name of the user assigned to the project
 *                   tasks:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         taskName:
 *                           type: string
 *                           description: Name of the task
 *                         taskStatus:
 *                           type: string
 *                           description: Status of the task
 *       500:
 *         description: Internal server error
 * 
 * /api/fellow/completed-project:
 *   get:
 *     summary: Get completed projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: A list of completed projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Project ID
 *                   projectName:
 *                     type: string
 *                     description: Name of the project
 *                   projectStatus:
 *                     type: string
 *                     description: Status of the project
 *                   userName:
 *                     type: string
 *                     description: Name of the user assigned to the project
 *                   tasks:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         taskName:
 *                           type: string
 *                           description: Name of the task
 *                         taskStatus:
 *                           type: string
 *                           description: Status of the task
 *       500:
 *         description: Internal server error
 * 
 * /api/fellow/in-progress:
 *   get:
 *     summary: Get projects in progress
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: A list of projects in progress
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Project ID
 *                   projectName:
 *                     type: string
 *                     description: Name of the project
 *                   projectStatus:
 *                     type: string
 *                     description: Status of the project
 *                   userName:
 *                     type: string
 *                     description: Name of the user assigned to the project
 *                   tasks:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         taskName:
 *                           type: string
 *                           description: Name of the task
 *                         taskStatus:
 *                           type: string
 *                           description: Status of the task
 *       500:
 *         description: Internal server error
 * 
 * /api/fellow/available-project:
 *   get:
 *     summary: Get available projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: A list of available projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Project ID
 *                   projectName:
 *                     type: string
 *                     description: Name of the project
 *                   projectStatus:
 *                     type: string
 *                     description: Status of the project
 *                   userName:
 *                     type: string
 *                     description: Name of the user assigned to the project
 *                   tasks:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         taskName:
 *                           type: string
 *                           description: Name of the task
 *                         taskStatus:
 *                           type: string
 *                           description: Status of the task
 *       500:
 *         description: Internal server error
 */

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
const cors = require('cors')

//fellow
router.post('/fellow/login', cors() ,fellowLogin) 
router.post('/fellow/signup', cors() , fellowRegister) 
router.post('/fellow/create-password', cors() ,createPassword)
router.post('/fellow/reset-password', cors() ,resetPassword);
router.post('/fellow/update-password', cors() ,updatePassword);
router.post('/fellow/confirm-token', cors() ,resetToken);
router.post('/fellow/assessment', cors() ,authenticate, saveAssessment)
router.get('/fellow/assigned-project', cors() ,getAssignedProjects);
router.get('/fellow/completed-project', cors() ,getCompletedProjects);
router.get('/fellow/in-progress-project', cors() ,getInProgressProjects);
router.get('/fellow/available-project', cors() ,getAvailableProjects);
router.get('/fellow/assessment', cors() ,authenticate, getAssessment)
router.get('/fellow/notification', cors() ,notification);


module.exports = router;