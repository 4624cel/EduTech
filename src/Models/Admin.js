const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    Name: {
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
    Role: {
        type: String,
        default: 'Admin',
        required: true
    },
}, { timestamps: true }); 

module.exports = mongoose.models.Admin || mongoose.model('Admin', adminSchema);