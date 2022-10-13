const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    img:{
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    phone: {
        type: String
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
}, {timestamps:true}
);

module.exports = mongoose.model('User', UserScheme);
