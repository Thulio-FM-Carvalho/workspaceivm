//Recebendo o objeto do express
module.exports = function(app){
  app.post("/correios/calculo-prazo", function(req, resp){
    var dadosDaEntrega = req.body; //Recebendo os dados

    var correiosSOAPCliente = new app.Servicos.correiosSOAPCliente();

    //Chamando a função calculaPrazo passando os dados do corpo da requisição
    correiosSOAPCliente.calculaPrazo(dadosDaEntrega, function(erro, resultado){
      if (erro) {
        resp.statud(500).send("Erro");
        return;
      }

      console.log("Prazo calculado");
      resp.json(resultado);
    });
  });
}
