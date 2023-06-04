const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const configCors = require('./config/cors');
const configHelmet = require('./config/helmet');
const configRouter = require('./config/router');

const app = express();

// gzip compression
app.use(compression());
// set security HTTP headers
app.use(helmet(configHelmet));
// parse json request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// serve static content
app.use(express.static('public'))
// enable cors
app.use(cors(configCors));
app.options('*', cors());

// api routes
app.use(configRouter);

module.exports = app;