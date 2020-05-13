'use strict';

// =================================
// Imports
// =================================
const express = require('express');
const cors = require ('cors');
const path = require ('path');
const config = require('./config/config');

const app = express();
const port = config.port;

const http = require('http').Server(app);
const io = require('socket.io')(http);

// =================================
// Chat
// =================================

io.on('connection', (socket) => {
    const chat = require('./routes/chat.route')(socket, io);
});

// =================================
// Routers
// =================================
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const uploadRouter = require('./routes/upload.route');
const imageRouter = require('./routes/image.route');
const postRouter = require('./routes/post.route');
const routerLol = require('./routes/lol.route');


// =================================
// Middlewares
// =================================
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + 'public'));
app.use(express.static(__dirname + '/dist/foroLoL/'));

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/image', imageRouter);
app.use('/api/lol', routerLol);
app.use('/api/post', postRouter);



// =================================
// get / post / put /
// =================================

// app.get('/',(req,res) =>{
//     res.send("Server");
// })




app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/foroLoL/index.html'));
    });
// =================================
// =================================
//app.listen(port, () => console.log("http://localhost:" + port));
http.listen(port, () => console.log("http://localhost:" + port));

module.exports = app;