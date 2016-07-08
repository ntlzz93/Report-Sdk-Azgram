'use strict';

var mysql = require('mysql');


module.exports = function () {

    var con = mysql.createPool({
        connectionLimit: 100,
        host: "127.0.0.1",
        user: "root",
        port: 3306,
        password: '',
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