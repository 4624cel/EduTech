const mongoose = require('mongoose')


const subjectSchema = new mongoose.Schema({
    ID:{
        type: String,
        required: true,
        unique: true
    },
    Name:{
        type: String,
        required: true
    },
    Photo: {
        type: String,
    },
    Teacher: {   
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    }
})

module.exports = mongoose.model('Subject', subjectSchema)