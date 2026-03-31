require('dotenv').config();
process.on('uncaughtException', function(err) {
    console.log('❌ Uncaught Exception:', err);
});
process.on('unhandledRejection', function(err) {
    console.log('❌ Unhandled Rejection:', err);
});
const express = require('express');
const ConnectDB = require('./src/Config/BD_conexion');
const studentRoutes = require('./src/Routes/studentRoutes');
const teacherRoutes = require('./src/Routes/teacherRoutes');
const subjectRoutes = require('./src/Routes/subjectRoutes');
const authRoutes = require('./src/Routes/auth');


const app = express();
const PORT = process.env.PORT ||  3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
ConnectDB();

app.post('/test', (req, res) => {
    console.log('💡 Request recibida en /test');
    console.log('Body:', req.body);
    res.json({ msg: 'Servidor recibió el request correctamente' });
});

//route test
app.use('/api/', subjectRoutes);
app.use('/api/', teacherRoutes);
app.use('/api/', studentRoutes);
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});