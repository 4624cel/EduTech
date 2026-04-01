const express = require('express');
const router = express.Router();
const teacherController = require('../Controllers/teacherController');
const Auth = require('../Middlewares/Auth');

router.get('/getAllTeachers',Auth, teacherController.getAllTeachers);
router.get('/getTeacher/:ID', Auth, teacherController.getTeacherByID);

router.post('/createTeacher', Auth, teacherController.createTeacher);

router.put('/updateTeacher/:ID', Auth, teacherController.updateTeacher);

router.delete('/deleteTeacher/:ID', Auth, teacherController.deleteTeacher);

module.exports = router;