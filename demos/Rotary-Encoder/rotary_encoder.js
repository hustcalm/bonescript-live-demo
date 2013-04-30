// From Getting Started With node.js and socket.io 
// http://codehenge.net/blog/2011/12/getting-started-with-node-js-and-socket-io-v0-7-part-2/
"use strict";

var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    exec = require('child_process').exec,
    server,
    connectCount = 0;	// Number of connections to server

server = http.createServer(function (req, res) {
// server code
    var path = url.parse(req.url).pathname;
    console.log("path: " + path);
    switch (path) {
    case '/':
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>John Lobdell - Mini Project 4</h1>Try<ul><li><a href="/rotary_encoder.html">Rotary Encoder</a></li></ul>');

        res.end();
        break;

    default:		// This is so all the files will be sent.
        fs.readFile(__dirname + path, function (err, data) {
            if (err) {return send404(res); }
//            console.log("path2: " + path);
            res.write(data, 'utf8');
            res.end();
        });
        break;

    }
});

var send404 = function (res) {
    res.writeHead(404);
    res.write('404');
    res.end();
};

server.listen(8081);

// socket.io, I choose you
var io = require('socket.io').listen(server);
io.set('log level', 2);

// on a 'connection' event
io.sockets.on('connection', function (socket) {
    var frameCount = 0;	// Counts the frames from arecord
    var lastFrame = 0;	// Last frame sent to browser
    console.log("Connection " + socket.id + " accepted.");
//    console.log("socket: " + socket);

    // now that we have our connected 'socket' object, we can 
    // define its event handlers

    // Make sure gpio 38, 47, and 48 are available.
    exec("echo 38 > /sys/class/gpio/export");
    exec("echo 47 > /sys/class/gpio/export");
    exec("echo 48 > /sys/class/gpio/export");

    // Configure pullup/pulldown resistors
    exec("echo 0x0037 > /sys/kernel/debug/omap_mux/gpmc_ad6"); // Pullup for encoder A
    exec("echo 0x0037 > /sys/kernel/debug/omap_mux/gpmc_ad15"); // Pullup for encoder B
    exec("echo 0x0027 > /sys/kernel/debug/omap_mux/gpmc_a0"); // Pulldown for the switch

    // Handle disconnects
    socket.on('disconnect', function () {
        console.log("Connection " + socket.id + " terminated.");
        connectCount--;
        if(connectCount === 0) {
        }
        console.log("connectCount = " + connectCount);
    });

    // Periodically send data
    var push_interval = 20;
    function push_data() {
        // Send encoder A status
        var gpioPath = "/sys/class/gpio/gpio38/value";
        fs.readFile(gpioPath, 'base64', function (err, data) {
            if (err) throw err;
            socket.emit('enc_a', data);
        });

        // Send encoder B status
        gpioPath = "/sys/class/gpio/gpio47/value";
        fs.readFile(gpioPath, 'base64', function (err, data) {
            if (err) throw err;
            socket.emit('enc_b', data);
        });


        // Send encoder switch status
        gpioPath = "/sys/class/gpio/gpio48/value";
        fs.readFile(gpioPath, 'base64', function (err, data) {
            if (err) throw err;
            socket.emit('enc_sw', data);
        });

        setTimeout(push_data, push_interval);
    }
    push_data();

    connectCount++;
    console.log("connectCount = " + connectCount);
});
