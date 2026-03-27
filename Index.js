require('dotenv').config();
const express = require('express');
const ConnectDB = require('./src/Config/BD_conexion');
const studentRoutes = require('./src/Routes/studentRoutes');
const teacherRoutes = require('./src/Routes/teacherRoutes');
const subjectRoutes = require('./src/Routes/subjectRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
ConnectDB();

//route test
app.use('/api/', subjectRoutes);
app.use('/api/', teacherRoutes);
app.use('/api/', studentRoutes);

app.listen(PORT, () => {
    console.log(`Server running at https://localhost:${PORT}`);
});