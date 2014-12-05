/**
 * Created by theowinter on 05/12/14.
 */

var express = require('express');
var http = require('http');
var io = require('socket.io');
var Logger = require('./logger.js');

var logger = new Logger();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

var app = express();
app.use(allowCrossDomain);
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: '2234567890QWERTY'}));
app.use(app.router);


//Configure the server to use the client-folder:
//app.set('client', __dirname+'/client');
app.configure(function() {
    app.use(express.static(__dirname + '/client'));
    app.use(express.static(__dirname + '/bower_components'));
});

app.use('/', express.static(__dirname + '/client/'));

//socket:
io = io.listen(app.listen(process.env.PORT || 4730));

io.sockets.on('connection', function (socket) {
    socket.emit('message', { action: 'connected' });
    logger.log("user connected");
});

io.sockets.on('disconnect', function (socket) {
    socket.emit('message', { action: 'disconnect' });
    logger.log("user disconnected");
});



logger.log("BoardroomJS-Server sucessfully started..");