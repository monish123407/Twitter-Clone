const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar:{
        type:String
    },
    address1:String,
    city:String,
    state:String,
    zip:Number,
    about:String,
    phoneno:String
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;