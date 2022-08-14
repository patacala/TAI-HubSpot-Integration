require('./config/config');

const bodyParser = require('body-parser');
const express = require('express');
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

if (process.env.NODE_ENV !== 'production') {
    app.listen(config.PORT, () => {
        console.log('Escuchando en el port:', process.env.PORT || config.PORT);
    });
} else {
    https.createServer({
        cert: fs.readFileSync(config.CERTIFICATE.ROUTE + config.CERTIFICATE.CRT),
        key: fs.readFileSync(config.CERTIFICATE.ROUTE + config.CERTIFICATE.KEY)
    }, app).listen(config.PORT_HTTPS, () => {
        console.log('Servidor https correindo en el port ', config.PORT_HTTPS);
    });

    http.createServer(app).listen(config.PORT, () => {
        console.log('Servidor http correindo en el port ', config.PORT);
    });
}