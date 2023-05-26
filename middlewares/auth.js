const jwt = require('jsonwebtoken')
const User = require('../api/models/user.models')

const checkAuth = (req, res, next) => {
    if (!req.headers.token) {
        return res.status(500).send('Error: Token not valid')
    }
    jwt.verify(req.headers.token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            return res.status(500).send('Error: Token not valid')
        }
                const user = await User.findOne({ where: { email: data.email } })

        if (!user) {
            return res.status(500).send('Error: Token not valid')
        }
        res.locals.user = user
        console.log("Check Auth")
        next()
    })
}

const checkAdmin = (req, res, next) => {           
    if (res.locals.user.role === 'Admin') {
        next()     
    } else {
        res.status(403).send('Access denied');
    }
};

const checkSanitario = (req, res, next) => {    
    if (res.locals.user.role != 'Donante') {
        next()
    } else {
        res.status(403).send('Access denied');
    }
};

const checkDonante = (req, res, next) => {    
    if (res.locals.user.role != 'Sanitario') {
        next()
    } else {
        res.status(403).send('Access denied');
    }
};

module.exports = { checkAuth, checkAdmin, checkSanitario, checkDonante }


/*
cheackAUth -
token
token valid
user
res.locals.user

checkRole([]) -

res.locals.user.role === admin ? next()
*/