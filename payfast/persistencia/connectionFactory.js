var mysql  = require('mysql'); //Importando o módulo MYSQL

//Criando uma função que cria a conexão MYSQL
function createDBConnection(){
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'payfast'
        });
}

module.exports = function() {
    return createDBConnection;
}