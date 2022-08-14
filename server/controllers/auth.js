const { generarJWT } = require('../helpers/jwt');

const bcrypt = require('bcrypt');

const login = async(req, reply) => {
    let body = req.body;
    // const user = await User.findOne({ userName: body.userName })
    // if (!user || !bcrypt.compareSync(body.password, user.password)) {
    //     return reply.status(401).json({
    //         ok: false,
    //         err: {
    //             message: 'User or Password invalid'
    //         }
    //     });
    // }
    const user = {};
    // generate token
    const token = await generarJWT(user)

    return reply.json({
        ok: true,
        user: user,
        token
    });
}

const renewToken = async(req, reply) => {

    // const uid = req.uid
    // const user = await User.findById(uid)
    //     // console.log(user)
    //     // generate token
    // const token = await generarJWT(user)
    // delete user.password
    // return reply.json({
    //     ok: true,
    //     user,
    //     token
    // });
}

module.exports = {
    login,
    renewToken
}