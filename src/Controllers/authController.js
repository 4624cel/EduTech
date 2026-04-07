const Student = require("../Models/Student");
const Teacher = require("../Models/Teacher");
const Admin = require("../Models/Admin"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUserType = (email) => {
  const regexStudent = /^st\d+/i;
  const regexTeacher = /^th\d+/i;
  const regexAdmin = /^ad\d+/i;

  if (regexStudent.test(email)) return "student";
  if (regexTeacher.test(email)) return "teacher";
  if (regexAdmin.test(email)) return "admin";

  return null;
};

// Registro
exports.registrarUsuario = async (req, res) => {
  try {
    const { Email, Password, Name } = req.body;

    if (!Name || !Email || !Password) {
      return res.status(400).json({ msg: "Name, Email, and Password are required" });
    }

    const role = getUserType(Email);

    if (!role) {
      return res.status(400).json({ msg: "Email format not recognized (must start with st, th, or ad)" });
    }

    const ID = Email.split('@')[0].replace(/^[a-zA-Z]+/, '');
    let usuario;

    if (role === "student") {
      usuario = await Student.findOne({ Email });
      if (usuario)
        return res.status(400).json({ msg: "The student already exists" });

      usuario = new Student({ ID, Name, Email, Password, Role: role });

    } else if (role === "teacher") {
      usuario = await Teacher.findOne({ Email });
      if (usuario)
        return res.status(400).json({ msg: "The professor already exists" });

      usuario = new Teacher({ ID, Name, Email, Password, Role: role });

    } else if (role === "admin") {
      usuario = await Admin.findOne({ Email }); // ✅ Usar modelo Admin
      if (usuario)
        return res.status(400).json({ msg: "The admin already exists" });

      usuario = new Admin({ ID, Name, Email, Password, Role: "Admin" }); // ✅ Usar modelo Admin
    }

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

// Login (solo admins)
exports.loginUsuario = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const role = getUserType(Email);

    if (!role) {
      return res.status(400).json({ msg: "Email format not recognized" });
    }

    if (role !== "admin") {
      return res.status(403).json({ msg: "Access denied. Only admins can log in." });
    }

    const usuario = await Admin.findOne({ Email }); // ✅ Buscar en colección Admin
    if (!usuario)
      return res.status(400).json({ msg: "Admin does not exist" });

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