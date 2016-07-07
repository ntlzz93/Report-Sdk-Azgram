'use strict';

var config = require('../config/env/dev');
var reportModel = require('../models/report.model');
var dateTime = require('node-datetime');


/*  SDK */

exports.reportSignUp = function (date, callback) {
    var model = new reportModel();
    model.getUserRegisterPerday(date, function (rows) {
        callback(rows);
    });
};

exports.reportActive = function (lastVisitDate, callback) {
    var model = new reportModel();
    model.getUserActive(lastVisitDate, function (rows) {
        callback(rows);
    });
};

exports.reportMessage = function (date, callback) {
    var model = new reportModel();
    model.getUserMessage(date, function (messageSent, messageDelivered) {
        callback(messageSent, messageDelivered);
    });
};

exports.reportCall = function (date, callback) {
    var model = new reportModel();
    model.getUserCall(date, function (callFree, callOut) {
        callback(callFree, callOut);
    });
};

/* AZGRAM */

exports.reportActiveAzGram = function(date,callback){
    var model = new reportModel();
    model.getUserActiveAzGram("2016-05-19",function(users){
       callback(users);
    });
};

exports.reportMessageAzGram = function(date,callback){

    var temp = dateTime.create(date);
    var datenow = temp.now();

    var model = new reportModel();
    model.getMessageAzGram(144082233,function(messages){
       callback(messages);
    });
};

exports.index = function (req, res) {

    res.render('index', {title: 'Report'});
};