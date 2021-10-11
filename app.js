const express = require('express');
const app = express();
const cities = require('./routes/cities');
const auth = require('./routes/auth');
const fileRoute = require('./routes/files');
const db = require('./routes/setupDb');

require("./db/conenction");

var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

app.use('/api/setupDb', db);
app.use('/api/cities', cities);
app.use('/api/auth', auth);
app.use('/api/file', fileRoute);


module.exports = app;