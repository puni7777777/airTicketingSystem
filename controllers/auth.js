const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('auth/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { name, username, password } = req.body;
        console.log(name, username, password)
        const user = new User({ name, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            res.redirect('/');
        })
    } catch (e) {
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('auth/login');
}

module.exports.login = (req, res) => {
    const redirectUrl = '/';
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}
