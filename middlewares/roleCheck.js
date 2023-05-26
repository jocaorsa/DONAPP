const checkAdmin = (req, res, next) => {
   
    if (res.locals.user.role === 'Admin') {
        next()
    } else {
        res.status(403).send('Access denied');
    }
};

const checkSanitario =  (req, res, next) => {
    if (res.locals.user.role === 'Admin' || res.locals.user.role === 'Sanitario') {
        next()
    } else {
        res.status(403).send('Access denied');
    }
};

const checkDonante = (req, res, next) => {
    console.log("Check Donante") 
    
    if (res.locals.user.role === 'Admin' || res.locals.user.role === 'Donante') {
        next()
    } else {
        res.status(403).send('Access denied');
    }
};

module.exports = { checkAdmin, checkDonante, checkSanitario  }
















