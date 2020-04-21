// =================================
// Imports
// =================================
const express = require('express')
const cors = require ('cors')
const puerto = 3000;


// =================================
// Routers
// =================================
const routerLol = require('./routes/routerApiLoL');


// =================================
// Middlewares
// =================================
const app = express();
app.use('/api/lol', routerLol);


// =================================
// get / post / put /
// =================================

app.get('/',(req,res) =>{
    res.send("Server");
})





// =================================
// =================================
app.listen(puerto, () => console.log("Estoy corriendo ya el server en el puerto: " , puerto , "\nEstoy en http://localhost:",puerto));