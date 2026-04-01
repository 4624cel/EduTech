const Student = require('../Models/Student');

exports.getAllStudents = async (req, res) => {
    try {
        const Students = await Student.find();
        res.status(200).json({message: "Students fetched successfully",code:200, data: Students});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error });
    }
};

exports.getStudentByID = async (req,res) =>{
    try {
        const ID = req.params.ID; 
        if (!ID) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const student = await Student.findOne({ ID });
        
        if (!student) {
            return res.status(404).json({ message: 'Student not found',code: 404 });
        }

        res.status(200).json({ message: 'Student fetched successfully', data: student });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student',code:500, error });
    }
};

exports.createStudent = async (req, res) => {
    try {
        const { ID, Name, Email, Password } = req.body;
        const newStudent = new Student({ID, Name, Email, Password,Role: "student"});
        await newStudent.save();
        res.status(201).json({message: "Student created successfully",code:201, data: newStudent});
    } catch (error) {
        res.status(400).json({ message: 'Error creating student', error });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const { ID } = req.params;
        const { Name, Email } = req.body;
        const updatedStudent = await Student.findOneAndUpdate({ ID }, { Name, Email }, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: 'Error updating student', error });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const { ID } = req.params;
        const deletedStudent = await Student.findOneAndDelete({ ID });
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found', code: 404 });
        } 
        res.status(200).json({ message: 'Student deleted successfully', code: 200 });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error });
    }
};