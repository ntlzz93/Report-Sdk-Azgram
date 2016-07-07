'use strict';

var mysql = require('mysql');


module.exports = function () {

    var conf = mysql.createPool({
        connectionLimit: 100,
        host: "173.194.243.33",
        user: "azstack",
        port: 3306,
        password: 'duyhaucom22',
        database: "EMMA_old",
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