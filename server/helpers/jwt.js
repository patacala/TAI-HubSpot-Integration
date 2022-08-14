const jwt = require('jsonwebtoken')
const config = require('../config/config')

const generarJWT = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload.toJSON(), config.TOKEN.SECRET, {
            expiresIn: config.TOKEN.EXPIRATION
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('no se pudo generar el token ')
            } else {
                resolve(token)
            }
        })

    })

}

const generarJWTAC = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload.toJSON(), config.TOKENAG.SECRET, {
            expiresIn: config.TOKENAG.EXPIRATION
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('no se pudo generar el token ')
            } else {
                resolve(token)
            }
        })

    })

}


const messageError = (error) => {
    return new Promise((resolve, reject) => {
        let vectorMessag = [];
        let vectorError = error.message.split(',');
        if (vectorError.length < 1) {
            reject('I do not generate an error message');
        } else {
            let position;
            for (let i = 0; i < vectorError.length; i++) {
                position = vectorError[i].lastIndexOf(":");
                vectorMessag[i] = vectorError[i].substring(position + 2);
            }
            resolve(vectorMessag);
        }
    });
}



const eliminaDuplicados = (arr) => {
    return arr.filter((valor, indice) => {
        return arr.indexOf(valor) === indice;
    });
}


module.exports = {
    generarJWT,
    generarJWTAC,
    messageError,
    eliminaDuplicados
}