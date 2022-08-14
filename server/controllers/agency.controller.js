const Agency = require('../models/agency');
const User = require('../models/users');
const { messageError, generarJWTAC } = require('../helpers/jwt');

const bcrypt = require('bcrypt');

const renewToken = async(req, reply) => {

}

const listAgency = async(req, reply) => {


}


module.exports = {
    listAgency,
    renewToken
}