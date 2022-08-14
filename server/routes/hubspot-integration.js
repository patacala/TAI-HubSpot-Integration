const express = require('express');
const bcrypt = require('bcrypt');
const { verificaToken } = require('../middlewares/autenticacion');
const _ = require('underscore');
const app = express();
const { shipmentManager } = require('../controllers/hubspot.controller')


app.post('/shipments', shipmentManager);
app.post('/contact', shipmentManager);
app.post('/company', shipmentManager);


module.exports = app;