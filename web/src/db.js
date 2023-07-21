const { Client } = require("pg");
const config = require('./config/config');
const postgresql = new Client(config.credentials);

module.exports = postgresql.connect();