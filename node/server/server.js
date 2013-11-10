var http = require('http');
var socket = require('socket.io');
var express = require('express');
var path = require('path');
var fs= require('fs');

var app = express();
var server = http.createServer(app);
var io = socket.listen(server);
server.listen(3000);

var clients = [];
var messages = [];

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.get('/benchmark', function(req, res) {
	messages.push(req.query.name);
	clients.forEach(function(socket) {
		socket.emit("message-added", req.query.name);
	});

});

io.sockets.on("connection", function(socket) {
	clients.push(socket);
	socket.emit("message-available", messages);

	socket.on("add-message", function() {
		messages.push(data);
		clients.forEach(function(socket) {
			socket.emit("message-added", data);
		});
	});

	socket.on("saveToFile", function(fileName) {
		fileName = fileName || 'benchmark';
		fs.appendFile(fileName + '.txt', messages.join(":"), function(err) {
			console.log(err)
		});
	})
});

console.log("server is running at localhost:3000");