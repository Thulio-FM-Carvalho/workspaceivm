//Consumindo um serviço RESTIFUL
var restify = require("restify-clients"); //Importando a LIB

//Função construtora do clienteCartoes
function ClienteCartoes(){
  //Fornecer a URL do servidor para criar um cliente
  this._cliente = restify.createJsonClient({

      //Qual a URL que queremos consumir?
      url: "http://localhost:3001"
  });
}

//Adicionando uma nova função "autoriza"
//Passando como parâmetro o cartão e callback, para serem passadas os dados na hora que o método for chamado
ClienteCartoes.prototype.autoriza = function(cartao, callback){

  //Invocando um método a partir do "/cartoes/autoriza"
  //Fazendo um post no cartões/autoriza da API cardfast
  this._cliente.post("/cartoes/autoriza", cartao, callback);
}



//Exportando o módulo, ou melhor, o construtor
module.exports = function(){
  return ClienteCartoes;
}
