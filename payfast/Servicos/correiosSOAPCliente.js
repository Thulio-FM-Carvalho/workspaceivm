//CÓDIGO RESPONSÁVEL POR CRIAR O CLIENTE PARA UMA WEBSERVICE SOAP

  var soap = require("soap");

  //Criando uma função construtora
  function correiosSOAPCliente(){
    this._url = "http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl";
  }

  //Invocando a criação de um cliente


  //Exportando a função construtora
  module.exports = function(){
    return correiosSOAPCliente;
  };

  //Criando uma função "calculcaPrazo" que cria um cliente e calcula o prazo
  //Passando como argumento o args e callback
  correiosSOAPCliente.prototype.calculaPrazo = function(args, callback){
      soap.createClient(this._url, function(erro, cliente){
        console.log("Cliente SOAP criado");

        //Chamando uma função já definida na webserice WSDL
        //Passando os parâmetros já definidos no WSDL
        //Passando os parâmetros em JSON que será convertindo em XML
        cliente.CalcPrazo(args, callback);
        });
      }
