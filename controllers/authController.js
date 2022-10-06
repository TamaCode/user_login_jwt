const User = require('../models/User');

const handleErrors = (err) => {
    let errors = { email: '', password: '' };

    if (err.code === 11000) {
        errors.email = 'This email is already registered'
    }

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach( error => {
            errors[error.properties.path] = error.properties.message;
        });
    }

    return errors;
};

module.exports.signup_get = (req, res) => {
    res.render('signup');
};

module.exports.login_get = (req, res) => {
    res.render('login');
};

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        res.status(201).json(user);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
};

module.exports.login_post = (req, res) => {
    const { email, password } = req.body;
    
    console.log(email, password);
    res.render('login');
};