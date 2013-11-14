var http = require('http');
var socket = require('socket.io');
var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();
var server = http.createServer(app);
var io = socket.listen(server);
server.listen(3000);

var clients = [];
var averageFPS = [];
var flipPages = [];

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.get('/benchmark', function(req, res) {
	if (req.query.averageFPS) {
		averageFPS.push(req.query.averageFPS);
		clients.forEach(function(socket) {
			socket.emit("message-FPS", req.query.averageFPS);
		});
	} else if (req.query.flipPage) {
		flipPages.push(req.query.flipPage);
		clients.forEach(function(socket) {
			socket.emit("message-flip", req.query.flipPage);
		});
	}

	res.end("200");
});

io.sockets.on("connection", function(socket) {
	clients.push(socket);
	socket.emit("message-available", {averageFPS: averageFPS, flipPages: flipPages});

	socket.on("add-message", function(data) {
		console.log("!!!!!!!!!!!!!!!!!!!!!!!!add-message");
		averageFPS.push(data);
		clients.forEach(function(socket) {
			socket.emit("message-added", data);
		});
	});

	socket.on("saveToFile", function(fileName) {
		fileName = fileName || 'benchmark';
		var data = JSON.stringify({averageFPS: averageFPS, flipPages: flipPages});
		fs.appendFile(fileName + '.txt', data, function(err) {
			console.log(err)
		});
	})
});

console.log("server is running at localhost:3000");