const Router = require('express').Router();
const Users = require('./model.js');
const Events = require('./modelevent.js');
var  Usuarioid;

Router.post('/login', function(req, res){
    var user = req.body.user ;
    var pass = req.body.pass ;

    Users.findOne({email:user}).exec(function(err,docs){
        if(docs!=null){
            if(pass == docs.password){
                res.end("validado"); 
                Usuarioid = docs.email;
            }else{
                res.end("Usuario o contraseña incorrecta");
            }
        }else{
            res.end("Usuario o contraseña incorrecta");
        }
    })
})

Router.get('/all', function(req, res){
    Events.find({email: Usuarioid}).exec(function(err,doc){
        if (err) {
            res.status(500)
            res.json(err) 
          }else{
            res.json(doc)
          }
          
    })
})


Router.post('/update', function(req, res){
    var id = req.body.id;
    var start = req.body.start;
    var end = req.body.end;

    Events.update({_id:id},{start:start,end:end}, function(err){
        if(err){
            res.send("error al actualizar")
        }else{
            res.send("registro actualizado")
        }
    })

  
})


Router.post('/new', function(req, res){
    var email = Usuarioid;
    var title = req.body.title;
    var start = req.body.start;
    var start_hour= req.body.start_hour;
    var end = req.body.end;
    var end_hour = req.body.end_hour;

    var evento = new Events({
        email:email,
        title: title,
        start:start,
        start_hour: start_hour,
        end: end,
        end_hour: end_hour
    })

    evento.save(function(err){
        if(err){
            res.send("Erro" + err);
        }else{
            res.send("agregado correctamente");
        }
    });

    
})


Router.post('/delete', function(req, res){
    var id = req.body.id;
    Events.deleteOne({_id:id},function(err){
        if(err){
            res.send("Error al eliminar registro")
        }else{
            res.send("Registro eliminado")
        }
    })
})


module.exports = Router;