"use strict";

// =================================
// Imports
// =================================
const express = require('express');
const cors = require ('cors');
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
const userRouter = require('./routes/user.route');
const uploadRouter = require('./routes/upload.route');
const imageRouter = require('./routes/image.route');
const postRouter = require('./routes/post.route');
const routerLol = require('./routes/routerApiLoL');


// =================================
// Middlewares
// =================================
app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/image', imageRouter);
app.use('/api/lol', routerLol);
app.use('/api/post', postRouter);


// =================================
// get / post / put /
// =================================

app.get('/',(req,res) =>{
    res.send("Server");
})





// =================================
// =================================
//app.listen(port, () => console.log("http://localhost:" + port));
http.listen(port, () => console.log("http://localhost:" + port));