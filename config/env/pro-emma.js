
'use strict';

var mysql = require('mysql');


module.exports = function () {

    var con = mysql.createPool({
        connectionLimit: 100,
        host: "",
        user: "",
        port: 3306,
        password: '',
        database: "",
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