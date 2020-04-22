"use strict";

// =================================
// Imports
// =================================
const express = require('express');
const cors = require ('cors');
const config = require('./config/config');

const app = express();
const puerto = config.port;

// =================================
// Routers
// =================================
const userRouter = require('./routes/user.route');
const routerLol = require('./routes/routerApiLoL');


// =================================
// Middlewares
// =================================
app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/lol', routerLol);


// =================================
// get / post / put /
// =================================

app.get('/',(req,res) =>{
    res.send("Server");
})





// =================================
// =================================
app.listen(puerto, () => console.log("Estoy corriendo ya el server en el puerto: " , puerto , "\nEstoy en http://localhost:" + puerto));