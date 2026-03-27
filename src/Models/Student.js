const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    ID:{
        type: String,
        required: true,
        unique: true
    },
    Name:{
        type: String,
        required: true
    },
    Email: {   
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Role:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Student', studentSchema)