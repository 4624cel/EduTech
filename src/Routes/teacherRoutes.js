const express = require('express');
const router = express.Router();
const teacherController = require('../Controllers/teacherController');
const Auth = require('../Middlewares/Auth');

/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: Gestión de maestros
 */
 
/**
 * @swagger
 * /getAllTeachers:
 *   get:
 *     summary: Obtener todos los maestros
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de maestros
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Teachers fetched successfully
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Teacher'
 *       401:
 *         description: Token no válido o no proporcionado
 */

router.get('/getAllTeachers',Auth, teacherController.getAllTeachers);

/**
 * @swagger
 * /getTeacher/{ID}:
 *   get:
 *     summary: Obtener un maestro por ID
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ID
 *         required: true
 *         schema:
 *           type: string
 *         example: th001
 *     responses:
 *       200:
 *         description: Datos del maestro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Teacher'
 *       401:
 *         description: Token no válido o no proporcionado
 *       404:
 *         description: Maestro no encontrado
 */

router.get('/getTeacher/:ID', Auth, teacherController.getTeacherByID);

/**
 * @swagger
 * /createTeacher:
 *   post:
 *     summary: Crear un nuevo maestro
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [ID, Name, Email]
 *             properties:
 *               ID:
 *                 type: string
 *                 example: th001
 *               Name:
 *                 type: string
 *                 example: María López
 *               Email:
 *                 type: string
 *                 example: th001@edu.com
 *               Photo:
 *                 type: string
 *                 example: https://example.com/foto.jpg
 *     responses:
 *       201:
 *         description: Maestro creado exitosamente
 *       400:
 *         description: Error en los datos
 *       401:
 *         description: Token no válido o no proporcionado
 */

router.post('/createTeacher', Auth, teacherController.createTeacher);

/**
 * @swagger
 * /updateTeacher/{ID}:
 *   put:
 *     summary: Actualizar datos de un maestro
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ID
 *         required: true
 *         schema:
 *           type: string
 *         example: th001
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 example: María López Actualizada
 *               Email:
 *                 type: string
 *                 example: th001_new@edu.com
 *               Photo:
 *                 type: string
 *                 example: https://example.com/nueva-foto.jpg
 *     responses:
 *       200:
 *         description: Maestro actualizado
 *       401:
 *         description: Token no válido o no proporcionado
 *       404:
 *         description: Maestro no encontrado
 */

router.put('/updateTeacher/:ID', Auth, teacherController.updateTeacher);

/**
 * @swagger
 * /deleteTeacher/{ID}:
 *   delete:
 *     summary: Eliminar un maestro
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ID
 *         required: true
 *         schema:
 *           type: string
 *         example: th001
 *     responses:
 *       200:
 *         description: Maestro eliminado exitosamente
 *       401:
 *         description: Token no válido o no proporcionado
 *       404:
 *         description: Maestro no encontrado
 */

router.delete('/deleteTeacher/:ID', Auth, teacherController.deleteTeacher);

module.exports = router;