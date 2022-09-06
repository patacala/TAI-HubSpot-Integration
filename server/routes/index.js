const express = require('express');
const app = express();

app.use('/api/hubspot-integration', require('./hubspot-integration'));


module.exports = app;