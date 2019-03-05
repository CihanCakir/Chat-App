const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000
let app = express();
let Server = http.createServer(app);
let io = socketIO(Server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    
    console.log("A new user just connected");
   
    socket.on('disconnect', () => {
        console.log('User was a disconnet from server.');
    });
    
});

Server.listen(port ,() => {
    console.log(`Server is Up on port ${port}`);
})
