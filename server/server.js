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

    socket.emit('newMessage', {
        from:"Admin",
        text:"Welcome to the chat App!",
        createdAt: new Date().getTime()

    });
    socket.broadcast.emit('newMessage', {
        from:"Admin",
        text:"New User Joined!!",
        createdAt: new Date().getTime()

    });

    socket.on('createMessage', (message) => {
        console.log("createMessage",message);
       io.emit('newMessage', {
          from:message.from,
           text:message.text,
            createdAt: new Date().getTime()
           // MARK I 
         
        });
    });
   
    socket.on('disconnect', () => {
        console.log('User was a disconnet from server.');
    });
    
});

Server.listen(port ,() => {
    console.log(`Server is Up on port ${port}`);
})
