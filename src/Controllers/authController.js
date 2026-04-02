const Student = require("../Models/Student");
const Teacher = require("../Models/Teacher");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Detectar rol automáticamente
const getUserType = (email) => {
  const regexStudent = /^st\d+/i;
  const regexTeacher = /^th\d+/i;

  if (regexStudent.test(email)) {
    return "student";
  }

  if (regexTeacher.test(email)) {
    return "teacher";
  }

  return null; // opcional: por si no cumple ningún formato
};

// Registro
exports.registrarUsuario = async (req, res) => {
  try {
    const { Email, Password , Name } = req.body;
    //  El role NO viene del frontend
    const role = getUserType(Email);
    const ID = Email.split('@')[0].replace(/^[a-zA-Z]+/, '');
     if (!Name || !Email || !Password) {
      return res.status(400).json({ msg: "Name, Email, and Password are required" });
    }

    let usuario;

    if (role === "student") {
      usuario = await Student.findOne({ Email: Email });
      if (usuario)
        return res.status(400).json({ msg: "The student already exists" });

      usuario = new Student({
        ID: ID,
        Name: Name,  
        Email: Email,
        Password: Password,
        Role: role, // guardado en DB
      });

    } else {
      usuario = await Teacher.findOne({ Email: Email });
      if (usuario)
        return res.status(400).json({ msg: "The professor already exists" });

      usuario = new Teacher({
        ID: ID,
        Name: Name,  
        Email: Email,
        Password: Password,
        Role: role,
      });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    usuario.Password = await bcrypt.hash(Password, salt);

    await usuario.save();

    res.status(201).json({
      msg: `${role === "student" ? "Student" : "Teacher"} registered successfully`,
    });

  } catch (error) {
    res.status(500).json({
      msg: "Error registering user",
      errorMSG: error.message,
    });
  }
};

// Login
exports.loginUsuario = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const role = getUserType(Email);

    let usuario;

    if (role === "student") {
      usuario = await Student.findOne({ Email: Email });
      if (!usuario)
        return res.status(400).json({ msg: "Student does not exist" });
    } else {
      usuario = await Teacher.findOne({ Email: Email });
      if (!usuario)
        return res.status(400).json({ msg: "Teacher does not exist" });
    }

    const isMatch = await bcrypt.compare(Password, usuario.Password);
    if (!isMatch)
      return res.status(400).json({ msg: "Incorrect password" });

    // JWT incluye el role REAL (seguro)
    const payload = {
      usuario: {
        Email: usuario.Email,
        Role: usuario.Role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );

  } catch (error) {
    res.status(500).json({
      msg: "Server error",
      errorMSG: error.message,
    });
  }
};