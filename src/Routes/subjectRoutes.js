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
 *         description: Lista de materias con maestro asignado
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
 */

router.get('/getAllSubjects',Auth, subjectController.getAllSubjects);

/**
 * @swagger
 * /getSubject/{ID}:
 *   get:
 *     summary: Obtener una materia por ID de MongoDB (_id)
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ID
 *         required: true
 *         schema:
 *           type: string
 *         description: _id de MongoDB de la materia
 *         example: 664f1a2b3c4d5e6f7a8b9c0d
 *     responses:
 *       200:
 *         description: Datos de la materia
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
 *     description: El campo Teacher debe ser el _id de MongoDB de un maestro existente.
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
 *                 description: _id de MongoDB del maestro
 *                 example: 664f1a2b3c4d5e6f7a8b9c0d
 *     responses:
 *       201:
 *         description: Materia creada exitosamente
 *       400:
 *         description: Error en los datos
 *       401:
 *         description: Token no válido o no proporcionado
 */

router.post('/createSubject', Auth, subjectController.createSubject);

/**
 * @swagger
 * /updateSubject/{ID}:
 *   put:
 *     summary: Actualizar una materia
 *     description: ID en la URL es el _id de MongoDB de la materia. Teacher debe ser el _id de un maestro existente.
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ID
 *         required: true
 *         schema:
 *           type: string
 *         description: _id de MongoDB de la materia
 *         example: 664f1a2b3c4d5e6f7a8b9c0d
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
 *                 description: _id de MongoDB del nuevo maestro
 *                 example: 664f1a2b3c4d5e6f7a8b9c0d
 *     responses:
 *       200:
 *         description: Materia actualizada
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
 *     summary: Eliminar una materia
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ID
 *         required: true
 *         schema:
 *           type: string
 *         example: 664f1a2b3c4d5e6f7a8b9c0d
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