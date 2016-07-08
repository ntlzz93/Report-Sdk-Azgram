'use strict';

var config = require('../config/env/dev');
var db = config();

var azgram = require('../config/env/dev-emma');
var db_az = azgram();

var ReportModel = function () {
    // var numberUserRegister,
    //     numberUserLogin,
    //     numberMessage,
    //     numberCall
};

/*
 * Lay thong tin user dang ky tren ngay cua sdk
 * date : thoi gian
 * callback : ham tra ve gia tri
 * */
ReportModel.prototype.getUserRegisterPerday = function (date, callback) {

    var sql = "SELECT count(id) as number FROM dh_user WHERE registerDate like '%" + date + "%'";

    db.query(sql, function (err, rows) {
        if (err) throw err;

        var count = rows[0]['number'];
        callback(count);

    });

};

/*
 * Lay thong tin user dang active cua sdk
 * lastVisitDate : thoi gian online gan day
 * callback : ham tra ve gia tri
 * */

ReportModel.prototype.getUserActive = function (lastVisitDate, callback) {

    var sql = "SELECT count(id) as number FROM dh_user WHERE lastVisitDate like '%" + lastVisitDate + "%'";

    db.query(sql, function (err, rows) {
        if (err) throw err;

        var count = rows[0]['number'];
        callback(count);

    });

};

/*
 * Lay so tin nhan trong ngay cua sdk
 * date : ngay hom nay
 * callback : ham tra ve gia tri
 * */

ReportModel.prototype.getUserMessage = function (date, callback) {

    var sql = "SELECT sum(messageSent) as messageSent,sum(messageDelivered) as messageDelivered FROM dh_user_message_counter WHERE date like '%" + date + "%'";

    db.query(sql, function (err, rows) {
        if (err) throw err;

        var messageSent = rows[0]['messageSent'];
        var messageDelivered = rows[0]['messageDelivered'];
        callback(messageSent, messageDelivered);

    });
};

/*
 * Lay so tin nhan trong ngay cua sdk
 * date : ngay hom nay
 * callback : ham tra ve gia tri
 * */

ReportModel.prototype.getUserCall = function (date, callback) {

    var sql = "SELECT sum(callfree) as callFree,sum(callout) as callOut FROM dh_user_message_counter WHERE date like '%" + date + "%'";

    db.query(sql, function (err, rows) {
        if (err) throw err;

        var callFree = rows[0]['callFree'];
        var callOut = rows[0]['callOut'];
        callback(callFree, callOut);

    });
};

/*
 * Lay thong tin user dang active cua azgram
 * date : thoi gian online gan day
 * callback : ham tra ve gia tri
 * */


ReportModel.prototype.getUserActiveAzGram = function (date, callback) {
    var sql = "SELECT count(id) as users FROM dh_user WHERE lastVisitDate like '%" + date + "%'";

    db_az.query(sql, function (err, rows) {
        if (err) throw  err;

        var count = rows[0]['users'];
        callback(count);
    });
};

/*
 * Lay thong tin message  cua azgram
 * date : thoi gian
 * callback : ham tra ve gia tri
 * */

ReportModel.prototype.getMessageAzGram = function (date, callback) {

    var sql = "SELECT count(msg) as message FROM dh_chat WHERE created like " + date;

    db_az.query(sql, function (err, rows) {
        if (err) throw  err;

        var count = rows[0]['message'];
        callback(count);
    });
};

module.exports = ReportModel;