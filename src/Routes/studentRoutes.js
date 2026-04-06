const express = require('express');
const router = express.Router();
const studentController = require("../Controllers/studentController");
const Auth = require('../Middlewares/Auth');

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Gestión de estudiantes
 */
 
/**
 * @swagger
 * /getAllStudents:
 *   get:
 *     summary: Obtener todos los estudiantes
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estudiantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Students fetched successfully
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Student'
 *       401:
 *         description: Token no válido o no proporcionado
 *       500:
 *         description: Error del servidor
 */

router.get('/getAllStudents',Auth, studentController.getAllStudents);

/**
 * @swagger
 * /getStudent/{ID}:
 *   get:
 *     summary: Obtener un estudiante por ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del estudiante
 *         example: 12345
 *     responses:
 *       200:
 *         description: Datos del estudiante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *       401:
 *         description: Token no válido o no proporcionado
 *       404:
 *         description: Estudiante no encontrado
 */

router.get('/getStudent/:ID', Auth, studentController.getStudentByID);

/**
 * @swagger
 * /createStudent:
 *   post:
 *     summary: Crear un nuevo estudiante
 *     description: Crea un estudiante y lo asocia a materias existentes por nombre.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [ID, Name, Email, Subjects]
 *             properties:
 *               ID:
 *                 type: string
 *                 example: 12345
 *               Name:
 *                 type: string
 *                 example: Juan Pérez
 *               Email:
 *                 type: string
 *                 example: st12345@edu.com
 *               Photo:
 *                 type: string
 *                 example: https://example.com/foto.jpg
 *               Subjects:
 *                 oneOf:
 *                   - type: string
 *                     example: Matemáticas
 *                   - type: array
 *                     items:
 *                       type: string
 *                     example: [Matemáticas, Historia]
 *     responses:
 *       201:
 *         description: Estudiante creado exitosamente
 *       400:
 *         description: Datos inválidos o materias no encontradas
 *       401:
 *         description: Token no válido o no proporcionado
 */

router.post('/createStudent', Auth, studentController.createStudent);

/**
 * @swagger
 * /updateStudent/{ID}:
 *   put:
 *     summary: Actualizar datos de un estudiante
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ID
 *         required: true
 *         schema:
 *           type: string
 *         example: 12345
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 example: Juan Pérez Actualizado
 *               Email:
 *                 type: string
 *                 example: st12345_new@edu.com
 *               Photo:
 *                 type: string
 *                 example: https://example.com/nueva-foto.jpg
 *               Subjects:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [Matemáticas, Física]
 *     responses:
 *       200:
 *         description: Estudiante actualizado
 *       401:
 *         description: Token no válido o no proporcionado
 *       404:
 *         description: Estudiante o materias no encontradas
 */

router.put('/updateStudent/:ID', Auth, studentController.updateStudent);

/**
 * @swagger
 * /deleteStudent/{ID}:
 *   delete:
 *     summary: Eliminar un estudiante
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ID
 *         required: true
 *         schema:
 *           type: string
 *         example: 12345
 *     responses:
 *       200:
 *         description: Estudiante eliminado exitosamente
 *       401:
 *         description: Token no válido o no proporcionado
 *       404:
 *         description: Estudiante no encontrado
 */

router.delete('/deleteStudent/:ID', Auth, studentController.deleteStudent);

module.exports = router;