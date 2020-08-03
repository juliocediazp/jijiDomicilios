
const path = require('path');
const conexion= require('../config/conexion');
const catalogojson= require('../config/catalogo.json');
const util = require('util');
const methodOverride = require('method-override');

module.exports = function(app, express){

    const CONTEXT_ORIGIN="/jiji";
    const CONTEXT_ROOT="/admin";
    const REDIRECT_USER_VIEWS=CONTEXT_ROOT+"/catalogo";
    const REDIRECTID =REDIRECT_USER_VIEWS+"/:id";

    

//app.use('/admin/public', express.static(__dirname + '/public'));
//app.use('/admin/admin/public', express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

app.get(CONTEXT_ORIGIN,function(req, res){
    res.render('../web',{vista:"index.ejs"});

});

app.get(REDIRECT_USER_VIEWS,function(req, res){
    //var con= new conexion(); 
    let json=catalogojson;
    try{
        console.log("ingreso a leer el json");
        console.log(util.inspect(json, {depth: null}));   

       //    console.log(util.inspect(usuario, {depth: null}));
           res.render('../web',{vista:"index.ejs", json:json});
       // res.send(json);
       }catch(err){
           console.log("Error al ejecutar "+err)
       }; 
});

app.get(REDIRECTID,function(req, res){
    var con=new conexion();
    let id = req.body.usuario_id;
    console.log(util.inspect(req.body, {depth: null}));
    var usuario=[];
    con.executeQuery("select * from usuarios where usuario_id = ?",[id]).then((resp)=>{
        resp.forEach(item=>{
            let object={
                usuario_id:item.usuario_id,
                usuario:item.usuario, 
                referencia:item.referencia,
                password:item.password,
            };
             usuario.push(object)
        });       
        
        console.log(usuario);
        res.render('admin',{vista:"usuarios.ejs", usuario:usuario});
    }).catch((err)=>{
        console.log("Error al ejecutar selec "+err)
    });
});

app.post(REDIRECT_USER_VIEWS,function(req, res){
    //var con= new conexion();
    let json=catalogojson; 
    con.update("INSERT INTO usuarios(usuario, referencia, password) VALUES(?, ?, ?)",[req.body.usuario,req.body.referencia,req.body.password]).then((resp)=>{
        res.render('admin',{vista:"usuarios.ejs"});
     }).catch((err)=>{
      console.log(err);
     });
});

app.put(REDIRECTID,function(req, res){
    console.log("inicio metodo put")
    var con= new conexion(); 
    console.log(util.inspect(req.body, {depth: null}));
    let id = req.body.usuario_id;
    console.log("elemento a id " + id);
    let sql="select * from usuarios";
     con.executeQuery(sql)
        .then((res1)=>{
            console.log(" resultado de consulta  " + res1)
            res1.forEach(item=>{
                if (item.usuario_id ==id) {
                    con.update("update usuarios  set usuario = ? , referencia = ? ,password = ? WHERE usuario_id = ?",[req.body.usuario,req.body.referencia,req.body.password,req.body.usuario_id]).then((resp)=>{
                        res.render('admin',{vista:"usuarios.ejs"});
                        console.log("insert"+resp);
                     }).catch((err)=>{
                      console.log(err);
                     });
                }
            });
        });
    
    console.log("form data usuario " +  req.body.usuario);
    console.log("form data referencia " +  req.body.referencia);
    console.log("form data password " +  req.body.password);

});

app.delete(REDIRECTID,function(req, res){
    console.log("inicio metodo eliminar ")
    let userId = req.body.usuario_id;
    console.log("el ide a eliminar es el  "+userId)
    var con= new conexion(); 
    console.log(util.inspect(req.body, {depth: null}));
    let sql="select * from usuarios";
    con.executeQuery(sql)
        .then((respt)=>{
            console.log("select "+respt)
            respt.forEach(item1 =>{
                console.log("imes" + item1.usuario_id)
                if (item1.usuario_id ==userId) {
                    con.update("delete from usuarios where usuario_id = ?",[userId]).then((resp)=>{
                        console.log("resp delete " + resp)
                        res.render(REDIRECT_USER_VIEWS);
                        console.log("delete " + resp);
                     }).catch((err)=>{
                      console.log(err);
                     }); 
                }
            });
        }).catch((err)=>{
            console.log(err);
           });
    
});
};
