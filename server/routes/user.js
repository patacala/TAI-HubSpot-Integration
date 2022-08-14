const express = require('express');
const bcrypt = require('bcrypt');
const { verificaToken } = require('../middlewares/autenticacion');
const _ = require('underscore');
const app = express();
const { createUser } = require('../controllers/user')




// ===============================
// Create User
// ===============================

app.post('/', verificaToken, createUser);

// ===============================
// Update User
// ===============================



module.exports = app;