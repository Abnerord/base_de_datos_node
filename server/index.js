const User = require('./model.js')

const http = require('http'),
        path = require('path'),
        Routing = require('./rutas.js'),
        express = require('express'),
        bodyparser = require('body-parser'),
        mongoose = require('mongoose');

const PORT = 3000;
const app = express();

const Server = http.createServer(app);



mongoose.connect('mongodb://localhost/examen');

app.use(express.static("../client"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use('/examen', Routing)

Server.listen(PORT, function () { 
    console.log("server is listing on port: " + PORT);
    CrearUsuario();
 });

 function CrearUsuario(){
     User.findOne({email:'abner@nextu.com'}).exec(function(err,docs){
         if(docs==null){
             var usuario= new User({email:'abner@nextu.com',password:'123456'});
             usuario.save();
         }
     })
 }