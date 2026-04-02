const Subject = require('../Models/Subject');
const Teacher = require('../Models/Teacher');

exports.getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().populate('Teacher');
        res.status(200).json({message: "Subjects fetched successfully",code:200, data: subjects});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subjects', error });
    }
};

exports.getSubjectByID = async (req,res) =>{
    try {
        const ID = req.params.ID; 
        if (!ID) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const subject = await Subject.findById(ID).populate('Teacher');
        
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found',code: 404 });
        }

        res.status(200).json({ message: 'Subject fetched successfully', data: subject });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subject',code:500, error });
    }
};

exports.createSubject = async (req, res) => {
    try {
        const { ID, Name, Teacher } = req.body;
        const newSubject = new Subject({ID, Name, Teacher});
        await newSubject.save();
        res.status(201).json({message: "Subject created successfully",code:201, data: newSubject});
    } catch (error) {
        res.status(400).json({ message: 'Error creating subject', error });
    }
};

exports.updateSubject = async (req, res) => {
    try {
        const { ID } = req.params; // Puede ser código de materia, no ObjectId
        const { Name, Teacher } = req.body;

        // Buscar el teacher por nombre para obtener su ObjectId
        const teacherDoc = await Teacher.findOne({ name: Teacher });
        if (!teacherDoc) {
            return res.status(404).json({ message: `Teacher "${Teacher}" not found` });
        }

        const updatedSubject = await Subject.findOneAndUpdate(
            { code: ID },  // o {_id: ID} si usas ObjectId
            { Name, Teacher: teacherDoc._id },
            { new: true }
        );

        if (!updatedSubject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        // Responder con los datos actualizados
        res.status(200).json({
            Name: updatedSubject.Name,
            Teacher: Teacher // Retornar el nombre en lugar del ObjectId
        });
        
    } catch (error) {
    console.error(error); 
    res.status(500).json({
        message: 'Error updating subject',
        error: error.message || error.toString() 
    });

    }
};
exports.deleteSubject = async (req, res) => {
    try {
        const { ID } = req.params;
        const deletedSubject = await Subject.findOneAndDelete({ ID });
        if (!deletedSubject) {
            return res.status(404).json({ message: 'Subject not found', code: 404 });
        } 
        res.status(200).json({ message: 'Subject deleted successfully', code: 200 });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting subject', error });
    }
};