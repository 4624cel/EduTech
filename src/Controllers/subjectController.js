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
        const { ID } = req.params;

        if (!ID) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const subject = await Subject.findOne({ ID }).populate('Teacher');
        
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found', code: 404 });
        }

        res.status(200).json({ message: 'Subject fetched successfully', data: subject });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subject', code:500, error });
    }
};

exports.createSubject = async (req, res) => {
    try {
        const { ID, Name, Teacher: teacherCustomID , Photo} = req.body;
        const cleanedID = teacherCustomID.toString().trim();
        const teacherDoc = await Teacher.findOne({ ID: cleanedID });

        if (!teacherDoc) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        
        const newSubject = new Subject({
            ID,
            Name,
            Teacher: teacherDoc._id,
            Photo
        });

        await newSubject.save();

        res.status(201).json({
            message: "Subject created successfully",
            code: 201,
             data: {
                ID: newSubject.ID,
                Name: newSubject.Name,
                Teacher: teacherDoc.Name,
                Photo: newSubject.Photo
      }
        });

    } catch (error) {
        console.error(error); 
        res.status(400).json({ 
            message: 'Error creating subject', 
            error: error.message || error.toString() 
        });
    }
};

exports.updateSubject = async (req, res) => {
  try {
    const { ID } = req.params; // _id de la materia
    const { Name, Teacher: teacherId } = req.body; 

    // Buscar el teacher por _id
    const teacherDoc = await Teacher.findOne({ ID: teacherId });
    if (!teacherDoc) {
      return res.status(404).json({ message: `Teacher with ID "${teacherId}" not found` });
    }

    // Actualizar la materia
    const updatedSubject = await Subject.findOneAndUpdate(
      { ID },
      { Name, Teacher: teacherDoc._id },
      { new: true }
    );

    if (!updatedSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Responder con datos actualizados
    res.status(200).json({
      Name: updatedSubject.Name,
      Teacher: teacherDoc.Name 
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