require('./config/config');

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const cors = require('cors')
var path = require('path')
const fs = require('fs')
const config = require('./config/config')
const https = require('https')
const http = require('http')


const app = express()


app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(require('./routes/index'));

mongoose.connect(config.DB.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err, resp) => {
    if (err) throw err;
    console.log('Base de datos Conectada');
});

app.listen(config.PORT, () => {
    console.log('Escuchando en el port:', process.env.PORT || config.PORT);
});