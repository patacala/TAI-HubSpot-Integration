const express = require('express');
const jwt = require('jsonwebtoken'); // es para general el TOKEN

const { verificaToken } = require('../middlewares/autenticacion');
const { login, renewToken } = require('../controllers/auth')


const app = express();

app.post('/login', login);

app.get('/renew', verificaToken, renewToken );



module.exports = app;