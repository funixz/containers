var express = require('express'), 
    app = express(),
    http = require('http'),
    socketIo = require('socket.io');

// start webserver on port 8080
var server =  http.createServer(app);
var io = socketIo.listen(server);
var bind = process.argv[2] || "0.0.0.0";
var port = process.argv[3] || 8080;
server.listen(port, bind);
// add directory with our static files
app.use(express.static(__dirname + '/public'));
console.log("Server listening on " + bind + ":" + port);

// array of all lines drawn
var lineHistory = [];

// event-handler for new incoming connections
io.on('connection', function (socket) {
    console.log("New user connected.")
    // first send the history to the new client
    for (var i in lineHistory) {
        socket.emit('drawLine', { line: lineHistory[i] } );
    }
    // add handler for message type "drawLine".
    socket.on('drawLine', function (data) {
    // add received line to history 
        lineHistory.push(data.line);
        // send line to all clients
        io.emit('drawLine', { line: data.line });
    });
});
