const mysql = require('mysql2');
const nodemon = require('./nodemon.json');

var pool = mysql.createPool({
    "user" : nodemon.env.mysql_user,
    "password" : nodemon.env.mysql_password,
    "database" : nodemon.env.mysql_database,
    "host" : nodemon.env.mysql_host,
    "port" : nodemon.env.mysql_port
});

exports.pool = pool;