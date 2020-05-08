const config = require('../config/config');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

function checkToken(req, res, next){
    const token = req.header("x-auth");

    if (token) {
        jwt.verify(token, config.passport_secretKey, async (error, decoded) => {
            if (error) {
                res.status(401).json({msg: 'Error al autenticar el usuario, intente otra vez'});
            } else {
                const query = { email: decoded.email, token };
                const user = await User.getUser(query);
                if (user) {
                    next();
                } else {
                    res.status(401).json({msg: 'Autenticación incorrecta'});
                } 
            }
        });
    } else {
        res.status(400).json({msg: 'Encabezados incompletos'});
    }
}

module.exports = { checkToken };