const express = require('express');
const router = express.Router();
const ReportesController = require('../Controllers/studentController');
const Auth = require('../Middlewares/auth');

router.get('/getAllStudents',Auth, studentController.getAllStudents);
router.get('/getStudent/:ID', Auth, studentController.getStudentByID);

router.post('/createStudent', Auth, studentController.createStudent);

router.put('/updateStudent/:ID', Auth, studentController.updateStudent);

router.delete('/deleteStudent/:ID', Auth, studentController.deleteStudent);

module.exports = router;