const Teacher = require('../Models/Teacher');

exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json({message: "Teachers fetched successfully",code:200, data: teachers});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching teachers', error });
    }
};

exports.getTeacherByID = async (req,res) =>{
    try {
        const ID = req.params.ID; 
        if (!ID) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const teacher = await Teacher.findOne({ ID });
        
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found',code: 404 });
        }

        res.status(200).json({ message: 'Teacher fetched successfully', data: teacher });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching teacher',code:500, error });
    }
};

exports.createTeacher = async (req, res) => {
    try {
        const { ID, Name, Email, Password } = req.body;
        const newTeacher = new Teacher({ID, Name, Email, Password});
        await newTeacher.save();
        res.status(201).json({message: "Teacher created successfully",code:201, data: newTeacher});
    } catch (error) {
        res.status(400).json({ message: 'Error creating teacher', error });
    }
};

exports.updateTeacher = async (req, res) => {
    try {
        const { ID } = req.params;
        const { Name, Email } = req.body;
        const updatedTeacher = await Teacher.findOneAndUpdate({ ID }, { Name, Email }, { new: true });
        if (!updatedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json(updatedTeacher);
    } catch (error) {
        res.status(500).json({ message: 'Error updating teacher', error });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const { ID } = req.params;
        const deletedTeacher = await Teacher.findOneAndDelete({ ID });
        if (!deletedTeacher) {
            return res.status(404).json({ message: 'Teacher not found', code: 404 });
        } 
        res.status(200).json({ message: 'Teacher deleted successfully', code: 200 });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting teacher', error });
    }
};