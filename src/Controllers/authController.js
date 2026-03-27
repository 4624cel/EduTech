// controllers/authController.js
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registro de usuario (Student o Teacher según Role)
exports.registrarUsuario = async (req, res) => {
    try {
        const { ID, Name, Email, Password, Role } = req.body;

        let usuario;

        // Verificar si ya existe según Role
        if (Role.toLowerCase() === "student") {
            usuario = await Student.findOne({ email: Email });
            if (usuario) return res.status(400).json({ msg: "El estudiante ya existe" });
            usuario = new Student({ id: ID, name: Name, email: Email, password: Password });
        } else if (Role.toLowerCase() === "teacher") {
            usuario = await Teacher.findOne({ email: Email });
            if (usuario) return res.status(400).json({ msg: "El profesor ya existe" });
            usuario = new Teacher({ id: ID, name: Name, email: Email, password: Password });
        } else {
            return res.status(400).json({ msg: "Role no válido" });
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(Password, salt);

        await usuario.save();
        res.status(201).json({ msg: `${Role} registrado correctamente` });

    } catch (error) {
        res.status(500).json({ msg: "Error al registrar el usuario", errorMSG: error });
    }
};

// Login unificado (Student o Teacher)
exports.loginUsuario = async (req, res) => {
    try {
        const { Email, Password, Role } = req.body;

        let usuario;

        if (Role.toLowerCase() === "student") {
            usuario = await Student.findOne({ email: Email });
            if (!usuario) return res.status(400).json({ msg: "El estudiante no existe" });
        } else if (Role.toLowerCase() === "teacher") {
            usuario = await Teacher.findOne({ email: Email });
            if (!usuario) return res.status(400).json({ msg: "El profesor no existe" });
        } else {
            return res.status(400).json({ msg: "Role no válido" });
        }

        // Verificar contraseña
        const isMatch = await bcrypt.compare(Password, usuario.password);
        if (!isMatch) return res.status(400).json({ msg: "Contraseña incorrecta" });

        // Crear payload JWT
        const payload = {
            usuario: {
                id: usuario.id,
                email: usuario.email,
                role: Role.toLowerCase()
            }
        };

        // Sign JWT
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (error, token) => {
            if (error) throw error;
            res.json({ token });
        });

    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor", errorMSG: error });
    }
};