/*Imports*/
var express    = require('express');
var bodyParser = require('body-parser');
var soap       = require('soap');
var path       = require('path');
const session = require('express-session');


/**Configuracion de modulos */
//express
var app = express();
app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'web')]);
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(session({
    secret: 'jiji',
    resave: false,
    saveUninitialized: true
}))
require("./src/Controlador")(app,express);
app.listen(3000);