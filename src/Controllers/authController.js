const Student = require("../Models/Student");
const Teacher = require("../Models/Teacher");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Detectar rol automáticamente
const getUserType = (email) => {
  const regexStudent = /^st\d+/i;
  const regexTeacher = /^th\d+/i;
  const regexAdmin = /^ad\d+/i;

  if (regexStudent.test(email)) return "student";
  if (regexTeacher.test(email)) return "teacher";
  if (regexAdmin.test(email)) return "admin";

  return null; // ✅ Si no cumple ningún formato
};

// Registro
exports.registrarUsuario = async (req, res) => {
  try {
    const { Email, Password, Name } = req.body;

    if (!Name || !Email || !Password) {
      return res.status(400).json({ msg: "Name, Email, and Password are required" });
    }

    const role = getUserType(Email);

    // ✅ Validar que el email tenga un formato reconocido
    if (!role) {
      return res.status(400).json({ msg: "Email format not recognized (must start with st, th, or admin)" });
    }

    const ID = Email.split('@')[0].replace(/^[a-zA-Z]+/, '');
    let usuario;

    if (role === "student") {
      usuario = await Student.findOne({ Email });
      if (usuario)
        return res.status(400).json({ msg: "The student already exists" });

      usuario = new Student({ ID, Name, Email, Password, Role: role });

    } else if (role === "teacher") { // ✅ else if, no if suelto
      usuario = await Teacher.findOne({ Email });
      if (usuario)
        return res.status(400).json({ msg: "The professor already exists" });

      usuario = new Teacher({ ID, Name, Email, Password, Role: role });

    } else if (role === "admin") { // ✅ else if, no if suelto
      usuario = await Teacher.findOne({ Email });
      if (usuario)
        return res.status(400).json({ msg: "The admin already exists" });

      usuario = new Teacher({ ID, Name, Email, Password, Role: role });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    usuario.Password = await bcrypt.hash(Password, salt);

    await usuario.save();

    res.status(201).json({
      msg: `${role === "student" ? "Student" : role === "teacher" ? "Teacher" : "Admin"} registered successfully`,
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

    if (!role) {
      return res.status(400).json({ msg: "Email format not recognized" });
    }

    let usuario;

    if (role === "student") {
      usuario = await Student.findOne({ Email });
      if (!usuario)
        return res.status(400).json({ msg: "Student does not exist" });
    } else { // teacher y admin están en la misma colección
      usuario = await Teacher.findOne({ Email });
      if (!usuario)
        return res.status(400).json({ msg: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(Password, usuario.Password);
    if (!isMatch)
      return res.status(400).json({ msg: "Incorrect password" });

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