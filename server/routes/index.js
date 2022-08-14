const express = require('express');
const app = express();

app.use('/api/user', require('./user'));
app.use('/api/auth', require('./auth'));
app.use('/api/hubspot-integration', require('./hubspot-integration'));


module.exports = app;