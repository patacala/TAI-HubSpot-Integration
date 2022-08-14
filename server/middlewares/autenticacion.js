const jwt = require('jsonwebtoken');
const config = require('../config/config')

// =======================
// Verificar Token
// =======================


let verificaToken = (req, res, next) => {

    let token = req.header('token'); // leer los headers de la solicitud
    try {
        const user = jwt.verify(token, config.TOKEN.SECRET)
        req.uid = user._id
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Token no Valido'
            }
        });
    }
};

module.exports = {
    verificaToken
}