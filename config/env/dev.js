'use strict';

var mysql = require('mysql');


module.exports = function () {

    var con = mysql.createPool({
        connectionLimit: 100,
        host: "173.194.243.33",
        user: "azstack",
        port: 3306,
        password: 'duyhaucom22',
        database: "azstack_sdk_test",
        debug : false
    });

    con.getConnection(function (err) {
        if (err) {
            console.log("Error connecting to Db");
            return;
        }
        console.log('Connection established');
    });


    return con;
};