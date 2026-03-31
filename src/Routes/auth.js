const { Router } = require('express');
const { registrarUsuario, loginUsuario } = require('../Controllers/authController');

const router = Router();

// Ruta de registro
router.post('/signup', registrarUsuario);

// Ruta de login
router.post('/login', loginUsuario);

module.exports = router;