const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config({'path': './.env'});

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({'extended': true}));
app.use(bodyParser.json());

const routes = require('./api/routes');

routes(app);

app.use((req, res) => {

    res.status(404).send({'url': req.originalUrl + ' not found'});

});

app.listen(port);

console.log('RESTful API server started on: ' + port);