const express = require('express');
const app = express();
const { shipmentManager } = require('../controllers/hubspot.controller');
const { contactHook, companyHook } = require('../controllers/tai.controller')


app.post('/shipments', shipmentManager);
app.post('/contactHook', contactHook);
app.post('/companyHook', companyHook);


module.exports = app;