const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    email: {
        type: String,
    },
    pin: {
        type: String,
        required: true
    },
    toc: {
        type: Date,
        default: Date.now
    },
});

module.exports = User = mongoose.model('user', UserSchema);