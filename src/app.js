const express = require('express');
const route = require('./routes/auth.route');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use('/',route)


module.exports = app;