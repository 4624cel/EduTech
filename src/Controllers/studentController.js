const Student = require('../Models/Student');
const Subject = require('../Models/Subject');

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
    const { ID, Name, Email, Subjects, Photo } = req.body;

    if (!Subjects || (typeof Subjects !== 'string' && !Array.isArray(Subjects))) {
      return res.status(400).json({ message: 'Subjects must be a string or an array' });
    }

    // Asegurarnos de que Subjects sea array
    const subjectNames = Array.isArray(Subjects) ? Subjects : [Subjects];

    // Buscar materias por nombre y popular al maestro
    const subjectDocs = await Subject.find({ Name: { $in: subjectNames } }).populate({
      path: 'Teacher',
      select: 'Name -_id'
    });

    if (subjectDocs.length !== subjectNames.length) {
      const foundNames = subjectDocs.map(sub => sub.Name);
      const notFound = subjectNames.filter(name => !foundNames.includes(name));
      return res.status(404).json({ message: `Subjects not found: ${notFound.join(', ')}` });
    }

    // Crear estudiante con los _id de las materias
    const newStudent = new Student({
      ID,
      Name,
      Email,
      Photo,
      Subject: subjectDocs.map(sub => sub._id),
      Role: 'student'
    });

    await newStudent.save();

    res.status(201).json({
      message: 'Student created successfully',
      code: 201,
      data: {
        ID: newStudent.ID,
        Name: newStudent.Name,
        Email: newStudent.Email,
        Photo: newStudent.Photo,
        Subjects: subjectDocs.map(sub => ({
          Name: sub.Name,
          Teacher: sub.Teacher ? sub.Teacher.Name : null
        }))
      }
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: 'Error creating student',
      error: error.message || error.toString()
    });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { ID } = req.params;
    const { Name, Email, Subjects: subjectNames, Photo } = req.body;

    const updates = {};
    if (Name) updates.Name = Name;
    if (Email) updates.Email = Email;
    if (Photo) updates.Photo = Photo;

    // Si vienen materias, buscar sus _id por nombre
    if (subjectNames && Array.isArray(subjectNames) && subjectNames.length > 0) {
      const subjectDocs = await Subject.find({ Name: { $in: subjectNames } });

      if (subjectDocs.length !== subjectNames.length) {
        const foundNames = subjectDocs.map(sub => sub.Name);
        const notFound = subjectNames.filter(name => !foundNames.includes(name));
        return res.status(404).json({ message: `Subjects not found: ${notFound.join(', ')}` });
      }

      updates.Subject = subjectDocs.map(sub => sub._id); // Guardamos los ObjectId en MongoDB
    }

    const updatedStudent = await Student.findOneAndUpdate(
      { ID },
      updates,
      { new: true }
    ).populate({
      path: 'Subject',
      populate: { path: 'Teacher', select: 'Name -_id' } // Para mostrar nombres de materias y maestros
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Responder con los datos legibles
    res.status(200).json({
      ID: updatedStudent.ID,
      Name: updatedStudent.Name,
      Email: updatedStudent.Email,
      Photo: updatedStudent.Photo,
      Subjects: updatedStudent.Subject.map(sub => ({
        Name: sub.Name,
        Teacher: sub.Teacher ? sub.Teacher.Name : null
      }))
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating student', error: error.message || error.toString() });
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