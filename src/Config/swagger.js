const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EduTech API',
      version: '1.0.0',
      description: 'API para la gestión de estudiantes, maestros y materias',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Student: {
          type: 'object',
          properties: {
            ID: { type: 'string', example: '12345' },
            Name: { type: 'string', example: 'Juan Pérez' },
            Email: { type: 'string', example: 'st12345@edu.com' },
            Photo: { type: 'string', example: 'https://example.com/foto.jpg' },
            Role: { type: 'string', example: 'student' },
            Subject: {
              type: 'array',
              items: { type: 'string' },
              example: ['Matemáticas', 'Historia'],
            },
          },
        },
        Teacher: {
          type: 'object',
          properties: {
            ID: { type: 'string', example: 'th001' },
            Name: { type: 'string', example: 'María López' },
            Email: { type: 'string', example: 'th001@edu.com' },
            Photo: { type: 'string', example: 'https://example.com/foto.jpg' },
            Role: { type: 'string', example: 'teacher' },
          },
        },
        Subject: {
          type: 'object',
          properties: {
            ID: { type: 'string', example: 'MAT101' },
            Name: { type: 'string', example: 'Matemáticas' },
            Teacher: { type: 'string', example: '664f1a2b3c4d5e6f7a8b9c0d' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            code: { type: 'integer' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/Routes/*.js'],
};

module.exports = swaggerJsdoc(options);