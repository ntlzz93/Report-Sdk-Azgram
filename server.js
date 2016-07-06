var express = require('express');
var reportController = require('./controllers/report.controller');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('views', './views')
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    reportController.index(req, res);
});

io.on('connection', function (socket) {

    /*
     * Report for user register app
     * */

    socket.on('report signup', function (date) {
        var f = function () {
            reportController.reportSignUp(date, function (data) {
                io.emit('users signup', data);
            });
        };

        setInterval(f, 60000);
        f();
    });

    /*
     * Report for user active : login / day
     * */

    socket.on('report active', function (lastVisitDate) {
        var f = function () {
            reportController.reportActive(lastVisitDate, function (data) {
                io.emit('report active', data);
            });
        };

        setInterval(f, 60000);
        f();
    });

    /*
     * Report for user message / day
     * */

    socket.on('report message', function (date) {
        var f = function () {
            reportController.reportMessage(date, function (messageSent, messageDelivered) {
                var data = {
                    messageSent: messageSent,
                    messageDelivered: messageDelivered
                };
                io.emit('report message', data);
            });
        };

        setInterval(f, 60000);
        f();
    });

    /*
     * Report for user call / day
     * */

    socket.on('report call', function (date) {
        var f = function () {
            reportController.reportCall(date, function (callFree, callOut) {
                var dataCall = {
                    callFree: callFree,
                    callOut: callOut
                };
                io.emit('report call', dataCall);
            });
        };

        setInterval(f, 60000);
        f();
    });

});

http.listen(8000, function () {
    console.log("Running port 8000");
});
