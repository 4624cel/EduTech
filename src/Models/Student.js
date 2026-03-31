const mongoose = require('mongoose')
const Subject = require('./Subject')

const studentSchema = new mongoose.Schema({
    ID:{
        type: String,
        required: true,
        unique: true
    },
    Photo:{
        type: String,
        required: true
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
    Subject: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject'
        }
    ], 
    Role:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Student', studentSchema)