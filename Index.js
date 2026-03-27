require('dotenv').config();
const express = require('express');
const ConnectDB = require('./src/Config/BD_conexion');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
ConnectDB();

//route test
app.use();
app.use();

app.listen(PORT, () => {
    console.log(`Server running at https://localhost:${PORT}`);
});