/**
 * Created by theowinter on 05/12/14.
 */

var express = require('express');
var http = require('http');
var io = require('socket.io');
var Logger = require('./logger.js');
var DrawingManager = require('./drawingManager.js');

var logger = new Logger();
logger.enableLog(true);

var drawingManager = new DrawingManager();
var renderManager = new DrawingManager();
var pen;

var allowCrossDomain = function (req, res, next) {
    "use strict";
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

//Express SETUP:
var app = express();
app.use(allowCrossDomain);
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: '2234567890QWERTY'}));
app.use(app.router);

//Configure the server to use the client-folder:
//app.set('client', __dirname+'/client');
app.configure(function () {
    app.use(express.static(__dirname + '/client'));
    app.use(express.static(__dirname + '/bower_components'));
});

app.use('/', express.static(__dirname + '/client/'));

//Socket.io SETUP:
io = io.listen(app.listen(process.env.PORT || 4730));

io.sockets.on('connection', function (socket) {
    "use strict";
    socket.emit('message', { action: 'connected' });
    var message = {save: drawingManager.getLast(), pen: pen};
    socket.emit('initalData', message);
    logger.log("user connected");

    socket.on('mouseDown', function (msg) {
        socket.broadcast.emit('mouseDown', msg);
    });
    socket.on('mouseDrag', function (msg) {
        socket.broadcast.emit('mouseDrag', msg);
    });
    socket.on('mouseUp', function (msg) {
        socket.broadcast.emit('mouseUp');
    });
    socket.on('clearCanvas', function (msg) {
        drawingManager.clear();
        socket.broadcast.emit('clearCanvas');
    });
    socket.on('saveStatus', function (msg) {
        drawingManager.push(msg.save);
        pen = msg.pen;
    });
    socket.on('renderUpdate', function (msg) {
        renderManager.push(msg);
        //pen save?
        socket.broadcast.emit('renderBroadcast', msg);
    });
    socket.on('undo', function (msg) {
        drawingManager.pop();
        io.sockets.emit('undo', drawingManager.getLast());
    });
});

io.sockets.on('disconnect', function (socket) {
    "use strict";
    socket.emit('message', { action: 'disconnect' });
    logger.log("user disconnected");
});

//All done
logger.log("BoardroomJS-Server sucessfully started..");