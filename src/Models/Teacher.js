const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    ID:{
        type: String,
        required: true,
        unique: true
    },
    Photo: {
        type: String,
    },
    Name:{
        type: String,
        required: true
    },
    Email: {   
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true
    },
    Courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    Role:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Teacher', teacherSchema)