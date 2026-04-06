const express = require('express');
const router = express.Router();
const subjectController = require('../Controllers/subjectController');
const Auth = require('../Middlewares/Auth');

/**
 * @swagger
 * tags:
 *   name: Subjects
 *   description: Gestión de materias
 */

/**
 * @swagger
 * /getAllSubjects:
 *   get:
 *     summary: Obtener todas las materias
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de materias con maestro populado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Subjects fetched successfully
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Subject'
 *       401:
 *         description: Token no válido o no proporcionado
 *       500:
 *         description: Error del servidor
 */
router.get('/getAllSubjects', Auth, subjectController.getAllSubjects);

/**
 * @swagger
 * /getSubject/{ID}:
 *   get:
 *     summary: Obtener una materia por su ID personalizado
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID personalizado de la materia
 *         example: MAT101
 *     responses:
 *       200:
 *         description: Datos de la materia con maestro populado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Subject'
 *       401:
 *         description: Token no válido o no proporcionado
 *       404:
 *         description: Materia no encontrada
 */
router.get('/getSubject/:ID', Auth, subjectController.getSubjectByID);

/**
 * @swagger
 * /createSubject:
 *   post:
 *     summary: Crear una nueva materia
 *     description: El campo Teacher es el ID personalizado del maestro (ej. th001), no el _id de MongoDB.
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [ID, Name, Teacher]
 *             properties:
 *               ID:
 *                 type: string
 *                 example: MAT101
 *               Name:
 *                 type: string
 *                 example: Matemáticas
 *               Teacher:
 *                 type: string
 *                 description: ID personalizado del maestro
 *                 example: th001
 *     responses:
 *       201:
 *         description: Materia creada exitosamente
 *       400:
 *         description: Error en los datos
 *       401:
 *         description: Token no válido o no proporcionado
 *       404:
 *         description: Maestro no encontrado con ese ID
 */
router.post('/createSubject', Auth, subjectController.createSubject);

/**
 * @swagger
 * /updateSubject/{ID}:
 *   put:
 *     summary: Actualizar una materia por su ID personalizado
 *     description: El campo Teacher es el ID personalizado del maestro (ej. th001), no el _id de MongoDB.
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID personalizado de la materia
 *         example: MAT101
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 example: Matemáticas Avanzadas
 *               Teacher:
 *                 type: string
 *                 description: ID personalizado del nuevo maestro
 *                 example: th002
 *     responses:
 *       200:
 *         description: Materia actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Name:
 *                   type: string
 *                   example: Matemáticas Avanzadas
 *                 Teacher:
 *                   type: string
 *                   example: María López
 *       401:
 *         description: Token no válido o no proporcionado
 *       404:
 *         description: Materia o maestro no encontrado
 */
router.put('/updateSubject/:ID', Auth, subjectController.updateSubject);

/**
 * @swagger
 * /deleteSubject/{ID}:
 *   delete:
 *     summary: Eliminar una materia por su ID personalizado
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ID
 *         required: true
 *         schema:
 *           type: string
 *         example: MAT101
 *     responses:
 *       200:
 *         description: Materia eliminada exitosamente
 *       401:
 *         description: Token no válido o no proporcionado
 *       404:
 *         description: Materia no encontrada
 */
router.delete('/deleteSubject/:ID', Auth, subjectController.deleteSubject);

module.exports = router;