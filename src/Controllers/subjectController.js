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

exports.getSubjectById = async (req,res) =>{
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
        const { ID } = req.params;
        const { Name, Teacher } = req.body;
        const updatedSubject = await Subject.findOneAndUpdate({ ID }, { Name, Teacher }, { new: true });
        if (!updatedSubject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        res.status(200).json(updatedSubject);
    } catch (error) {
        res.status(500).json({ message: 'Error updating subject', error });
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