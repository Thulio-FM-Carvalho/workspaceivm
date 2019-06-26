//Classe específica para escreber códigos do express

var express =  require("express"); //Importando o módulo express
var consign = require("consign"); //Importando a lib CONSIGN que ajuda no gerenciamento das rotas
var bodyParser = require("body-parser"); //Importando o módulo body-parser
var expressValidator = require("express-validator"); //Importando o módulo express validator

module.exports = function(){
    var app = express();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json()); //Ensinando o bodyParser a trabalhar com JSON

    //Adicionando como um novo middleware da aplicação
    app.use(expressValidator());

    //Incluindo a psta controllers dentro do objeto APP
    //Consign = carrega os modulos no objeto do express
    consign()
    .include("controllers")
    .then("persistencia") //Carregue a "controllers" depois da persistencia
    .then("Servicos")
    .into(app);

    return app;
}
