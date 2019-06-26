//Código responsável por armazenar consultas em um memcached, onde o node irá fazer o I / O, pois ele trabalha muito melhot com entrada e saida de dados

var memcached = require("memcached");

module.exports = function(){
  return createMemcachedCliente;
}

//Criando uma função construtora
function createMemcachedCliente() {

  //Criando um novo cliente de memcached
  //Colocando o memchached para rodar na própia máquina
  var cliente = new memcached("localhost:11211",{
    retries: 10, //Número de tentativas feitas por cada consulta
    retry: 10000, //Caso não consegur consultar, tente depois de 10 segundos
    remove: true //Autorizando o memcached o nó que está morto
  });
  return cliente;
}
