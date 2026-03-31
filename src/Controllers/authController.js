const Student = require("../Models/Student");
const Teacher = require("../Models/Teacher");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Detectar rol automáticamente
const getUserType = (email) => {
  const regexStudent = /^st\d+/i;
  if (regexStudent.test(email)) {
    return "student";
  }
  return "teacher";
};

// Registro
exports.registrarUsuario = async (req, res) => {
  try {
    const { ID, Name, Email, Password } = req.body;

    //  El role NO viene del frontend
    const role = getUserType(Email);

    let usuario;

    if (role === "student") {
      usuario = await Student.findOne({ email: Email });
      if (usuario)
        return res.status(400).json({ msg: "El estudiante ya existe" });

      usuario = new Student({
        id: ID,
        name: Name,
        email: Email,
        password: Password,
        role: role, // guardado en DB
      });

    } else {
      usuario = await Teacher.findOne({ email: Email });
      if (usuario)
        return res.status(400).json({ msg: "El profesor ya existe" });

      usuario = new Teacher({
        id: ID,
        name: Name,
        email: Email,
        password: Password,
        role: role,
      });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(Password, salt);

    await usuario.save();

    res.status(201).json({
      msg: `${role === "student" ? "Estudiante" : "Profesor"} registrado correctamente`,
    });

  } catch (error) {
    res.status(500).json({
      msg: "Error al registrar el usuario",
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
      usuario = await Student.findOne({ email: Email });
      if (!usuario)
        return res.status(400).json({ msg: "El estudiante no existe" });
    } else {
      usuario = await Teacher.findOne({ email: Email });
      if (!usuario)
        return res.status(400).json({ msg: "El profesor no existe" });
    }

    const isMatch = await bcrypt.compare(Password, usuario.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Contraseña incorrecta" });

    // JWT incluye el role REAL (seguro)
    const payload = {
      usuario: {
        id: usuario.id,
        email: usuario.email,
        role: usuario.role,
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
      msg: "Error en el servidor",
      errorMSG: error.message,
    });
  }
};