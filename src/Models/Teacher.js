const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    ID:{
        type: String,
        required: true,
        unique: true
    },
    Photo:{
        type: String,
    },
    Name:{
        type: String,
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
    Courses: { 
        type: [String], 
        default: [] 
    },
    Role:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Teacher', teacherSchema)