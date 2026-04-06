const { Router } = require('express');
const { registrarUsuario, loginUsuario } = require('../Controllers/authController');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Registro e inicio de sesión
 */
 
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: >
 *       Registra un estudiante o maestro automáticamente según el formato del email.
 *       Emails que empiezan con "st" + números = estudiante.
 *       Emails que empiezan con "th" + números = maestro.
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [Name, Email, Password]
 *             properties:
 *               Name:
 *                 type: string
 *                 example: Juan Pérez
 *               Email:
 *                 type: string
 *                 example: st12345@edu.com
 *               Password:
 *                 type: string
 *                 example: miPassword123
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Student registered successfully
 *       400:
 *         description: El usuario ya existe o datos inválidos
 *       500:
 *         description: Error interno del servidor
 */

// Ruta de registro
router.post('/signup', registrarUsuario);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Devuelve un token JWT válido por 1 hora.
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [Email, Password]
 *             properties:
 *               Email:
 *                 type: string
 *                 example: st12345@edu.com
 *               Password:
 *                 type: string
 *                 example: miPassword123
 *     responses:
 *       200:
 *         description: Login exitoso, retorna JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Credenciales incorrectas o usuario no existe
 *       500:
 *         description: Error interno del servidor
 */

// Ruta de login
router.post('/login', loginUsuario);

module.exports = router;