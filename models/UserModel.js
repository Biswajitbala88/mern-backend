const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        reuired: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;