/* CÓDIGO RESPONSÁVEL POR CRIAR O SERVIDOR */

const http = require ("http"); //Importando um módulo HTTP

//Método de criação do servidor
const servidor = http.createServer();
//Fazendo servidor escutar a porta 3000
servidor.listen(3000)