const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is six characters']
    }
});

// Mongoose Hooks
userSchema.post('save', function (doc, next) {
    console.log('new user was created & saved', doc);
    next();
});

userSchema.pre('save',  function (next) {
    console.log('user is about to created and saved', this);
    next();
});

const User = mongoose.model('user', userSchema); // User model

module.exports = User;