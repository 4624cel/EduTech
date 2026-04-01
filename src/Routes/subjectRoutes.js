const express = require('express');
const router = express.Router();
const subjectController = require('../Controllers/subjectController');
const Auth = require('../Middlewares/Auth');

router.get('/getAllSubjects',Auth, subjectController.getAllSubjects);
router.get('/getSubject/:ID', Auth, subjectController.getSubjectByID);

router.post('/createSubject', Auth, subjectController.createSubject);

router.put('/updateSubject/:ID', Auth, subjectController.updateSubject);

router.delete('/deleteSubject/:ID', Auth, subjectController.deleteSubject);

module.exports = router;