const express = require('express');
const path = require("path");

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", function(socket){
    socket.on("newuser", function(username){
        socket.broadcast.emit("update", username + " has joined the chat.");
    });

    socket.on("exituser", function(username){
        socket.broadcast.emit("update", username + " has left the chat.");
    });

    socket.on("chat", function(message){
        socket.broadcast.emit("chat", message);
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));