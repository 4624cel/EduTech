const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    ID:{
        type: String,
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