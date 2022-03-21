const express = require('express');
const mysql = require('mysql');
const myconnect = require('express-myconnection');
const routes = require('./routes.js');
const res = require('express/lib/response');
const cors = require('cors');


const app = express();
app.set('port',process.env.PORT||9000)//Setear el puerto

const dbOptions = {
    host:'localhost',
    port:'3306',
    user:'root',
    password:'',
    database:'library'
};

//middlewares
app.use(myconnect(mysql,dbOptions,'single'))//Se le pasa un objeto de configuracion
app.use(express.json());//Se especifica el formato de los datos
app.use(cors());//modulo para que react haga preconsulas al server

//routes
app.get('/',(req,res)=>{
    res.send('Helo');
});
app.use('/api',routes);


//server running
app.listen(app.get('port'),()=>{
    console.log('Server is running:',app.get('port'));
});