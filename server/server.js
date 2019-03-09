const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage}=require('./utils/message');
const {isRealString}=require('./utils/isRealString');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000
let app = express();
let Server = http.createServer(app);
let io = socketIO(Server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    console.log("A new user just connected");

  

    socket.on('join',(params, callback) =>{
        if(!isRealString(params.name) || !isRealString(params.room)){
           return  callback('İsim ve Oda gereklidir');
        }     
                socket.join(params.room);
                users.removeUser(socket.id);
                users.addUser(socket.id, params.name, params.room);

                io.to(params.room).emit('updateUserList', users.getUserList(params.room));
                socket.emit('newMessage', generateMessage('Admin', `Welcome to the ${params.room} ! `));

                socket.broadcast.emit('newMessage',generateMessage('Admin', `New User ${params.name} Join!!`));

        callback();

    });

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
            
        }
      
       callback('This is the server:'); 
    });
   
socket.on('createLocationMessage', (coords) => {
    let user =users.getUser(socket.id);

    if(user){
        io.emit('newLocationMessage', generateLocationMessage(user.name, coords.lat, coords.lng))

    }
})

    socket.on('disconnect', () => {
                let user = users.removeUser(socket.id);
                if(user){
                    io.to(user.room).emit('updateUserList', users.getUserList(user.room));
                    io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} adlı kullanıcı ${user.room} adlı odadan cıktı`));
                }



        //console.log('User was a disconnet from server.');
    });
    
});

Server.listen(port ,() => {
    console.log(`Server is Up on port ${port}`);
})
////////////////////////
/*const path = require("path");
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
   
socket.on('createLocationMessage', (coords) => {
    io.emit('newMessage', generateMessage('Admin', `${coords.lat}, ${coords.lng}`))
})

    socket.on('disconnect', () => {
        console.log('User was a disconnet from server.');
    });
    
});

Server.listen(port ,() => {
    console.log(`Server is Up on port ${port}`);
})
*/
/////////////////////////// MARK II
/* 
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage} = require('utils');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000
let app = express();
let Server = http.createServer(app);
let io = socketIO(Server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    console.log("A new user just connected");

    socket.emit('newMessage', 
        generateMessage('Admin','Welcome to the chatt app!'));
   
        socket.broadcast.emit('newMessage', 
       generateMessage('Admin',"New User Joined!"));

    socket.on('createMessage', (message, callback ) =>
     {
        console.log("createMessage", message);
        io.emit('newMessage',
        generateMessage(message.from, message.text));
         callback('This is the Server:');
    })
   
socket.on('createLocationMessage', (coords) => {
    io.emit('newMessage', generateMessage('Admin', `${coords.lat}, ${coords.lng}`))
})

    socket.on('disconnect', () => {
        console.log('User was a disconnet from server.');
    });
    
});

Server.listen(port ,() => {
    console.log(`Server is Up on port ${port}`);
})



*/