'use strict';

var mysql = require('mysql');


module.exports = function () {

    var conf = mysql.createPool({
        connectionLimit: 100,
        host: "127.0.0.1",
        user: "root",
        port: 3306,
        password: '',
        database: "emma_old",
        debug : false
    });

    conf.getConnection(function (err) {
        if (err) {
            console.log("Error connecting to Db");
            return;
        }
        console.log('Connection established');
    });


    return conf;
};