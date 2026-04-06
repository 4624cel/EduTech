require('dotenv').config();
const express = require('express');
const ConnectDB = require('./src/Config/BD_conexion');
const studentRoutes = require('./src/Routes/studentRoutes');
const teacherRoutes = require('./src/Routes/teacherRoutes');
const subjectRoutes = require('./src/Routes/subjectRoutes');
const authRoutes = require('./src/Routes/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/Config/swagger');

const app = express();
const PORT = process.env.PORT ||  3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
ConnectDB();


//route test
app.use('/api/', subjectRoutes);
app.use('/api/', teacherRoutes);
app.use('/api/', studentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/', (req, res) => {
  res.send('El Servidor esta funcionando!');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});