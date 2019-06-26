
module.exports = function(app){

    //Criando uma rota com o método GET e aplicando o callback
    //Req = request
    //Resp = response
    app.get('/pagamentos', function(req, resp){
        console.log('Recebida a requisição de pegamentos na porta 3000')
        resp.send('Ok');
    });

    //get = pega algum valor
    //put = cria ou altera um recurso
    //post = cria ou altera um recurso
    //delete = remove o valor do recurso
    //REST = Quando implementamos uma funcionalidade em que estamos acessando operações através do HTTP, estamos fazendo uma API RESTIFUL

    //Rota que irá fazer a consulta
    app.get("/pagamentos/pagamento/:id", function(req, resp){
      var id =  req.params.id; //Pegando o ID e atribuindo a variável
      console.log("Consultando pagamento: " + id);

      var memcachedCliente = app.Servicos.memcachedCliente(); //Chamando o memchachedCliente

      //Função responsável por consultar chaves no chache
      //pagamento-20 = chave a ser consultada no cache
      //Passando o id do cache que quer buscar
      memcachedCliente.get("pagamento- " + id, function(erro, retorno){

        //Se aconteceu algum erro, ou não encontrou algo no cache, faça
        //MISS = Chave não encontrada
        //HIT = Chave encontrada
        if (erro || !retorno) {
          console.log("MISS - Chave não encontrada");

          var connection = app.persistencia.connectionFactory(); //Pegando a conexão
          var pagamentoDao = new app.persistencia.PagamentoDao(connection);   //Pegando o DAO

          //Resultado = Dados que vem do banco
          pagamentoDao.buscaPorId(id, function(erro, resultado){
            if (erro) {
              console.log("Erro ao consultar no banco" + erro);
              resp.status(500).send(erro);
              return;
            }
              console.log("Pagamento encontrado: " + JSON.stringify(resultado));
              resp.json(resultado); //Devolvendo o resultado em formato de JSON
              return;
          });

        //HIT NO CACHE
        } else {
          console.log("HIT - Valor: " + JSON.stringify(retorno));
          resp.json(retorno);
          return;
        }
      });



    });

    //Rota que irá deletar nosso pagamento
    app.delete("/pagamentos/pagamento/:id", function(req, resp){
        var pagamento = {};
            var id = req.params.id; //Recebendo uma requisição de um parâmetro ID

            pagamento.id = id;  //Atribuindo o ID da URL ao pagamento.id
            pagamento.status = "Cancelado";

            var connection = app.persistencia.connectionFactory(); //Pegando a conexão
            var pagamentoDao = new app.persistencia.PagamentoDao(connection);   //Pegando o DAO

            //Função que atualiza o status
            pagamentoDao.atualiza(pagamento, function(erro){
                if (erro){
                    resp.status(500).send(erro);
                    return;
                }
            console.log("Pagamento cancelado!");
            resp.status(204).send(pagamento); //Status code não mais disponível
        });
    });

    //Criando rota que irá confirmar nosso pagamento através do ID do location
    //Criando a variável ID
    app.put("/pagamentos/pagamento/:id", function(req, resp){

            var pagamento = {}; //Criando um objeto pagamento
            var id = req.params.id; //Recebendo uma requisição de um parâmetro ID, pegando o ID

            pagamento.id = id;  //Atribuindo o ID da URL ao pagamento.id
            pagamento.status = "Pagamento Confirmado!";

            var connection = app.persistencia.connectionFactory(); //Chamando a connection
            var pagamentoDao = new app.persistencia.PagamentoDao(connection);   //Chamando o pagamentoDao

            //Chamando o método atualiza do pagmentoDAO
            pagamentoDao.atualiza(pagamento, function(erro){
                if (erro){
                    resp.status(500).send(erro);
                    return;
                }
            console.log("Pagamento criado!");
            resp.send(pagamento);
        });
    });


    //Criando rota com o método POST e aplicando o callback
    //Rota que vai receber um novo pagamento
    app.post("/pagamentos/pagamento", function(req, resp){
        var pagamento = req.body["pagamento"]; //Recebendo os dados da requisição do corpo da arquivo JSON
        console.log("Processando uma requisição de um novo pagamento");

        //Validar se de fato tem os dados que a gente espera
        //Validando na chave dados do JSon
        req.assert("pagamento.forma_de_pagamento", "Forma de pagamento é obrigatório").notEmpty();
        req.assert("pagamento.valor", "Valor é obrigatório e deve ser decimal").notEmpty().isFloat();

        //Quais são os erros de validação encontrados nessa validação
        var erros = req.validationErrors();

        if (erros){
            console.log("Erros de validação encontrados");
            resp.status(400).send(erros);
            return;
        }

        pagamento.status = "Criado";
        pagamento.data = new Date;

        //Fazendo com que express acesse o banco de dados através do seu diretório
        var connection = app.persistencia.connectionFactory();

        /*Prototype vai garantir que quando invocarmos uma nova instância "new app.persistencia.PagamentoDao",
        é que vai poder acessar os métodos daquela instância (PagamentoDao);
        Passando a connection como parâmtro
        */
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        //Invocando o método salva passando como parâmetro o pagamento
        //Pasando uma function como callback, com os parâmetros de erro e resultado
        pagamentoDao.salva(pagamento, function(erro, resultado){

            //Se acontecer algum erro, faça
            if(erro) {
                console.log("Erro ao inserir no banco:" + erro);
                resp.status(500).send(erro);
            } else {
                pagamento.id = resultado.insertId; //Inserindo um ID
                console.log("Pagamento criado!");

                var memcachedCliente = app.Servicos.memcachedCliente(); //Chamando o memchachedCliente

                //Função responsável por adicionar
                //Passando um JSON com o id, tempo em segundos em que ele pode se manter no cache, e uma function
                memcachedCliente.set("pagamento- " + pagamento.id, pagamento, 60000, function(erro){
                  console.log("Nova chave adicionada ao cahce: pagamento- " + pagamento.id);
                });



                //Consumindo o cartão de crédito
                //Parte que pega os dados do cartão e envia para o cardfast
                if (pagamento.forma_de_pagamento == "cartao") {
                  var cartao = req.body["cartao"]; //Recebendo os dados
                  console.log(cartao);

                  var clienteCartoes = new app.Servicos.clienteCartoes();
                  //Chamando a função autoriza do clienteCartoes
                  clienteCartoes.autoriza(cartao, function(exception, request, responde, retorno){

                    //Se acontecer um erro, faça
                    if (exception) {
                      console.log(exception);
                      resp.status(400).send(exception);
                      return;
                    }
                    console.log(retorno);

                    resp.location("/pagamentos/pagamento" + pagamento.id);

                    //Definindo que, após o pagamento, o próximo passo a ser seguido é "CONFIRMAR" e "CANCELAR"
                    //Colocando no formato JSON
                    //Colocando o pagamento e os links dentro do "dados_do_pagamento"
                    var response = {
                        dados_do_pagamento: pagamento,
                        cartao: retorno, //Retorno é os dados do cartão no cardfast

                        //Passo a seguir aopós o pagamento criado
                        links: [
                            {
                                href:"http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                                rel: "Confirmar",
                                method: "PUT"
                            },
                            {
                                href:"http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                                rel: "Cancelar",
                                method: "DELETE"
                            }
                        ]
                    }

                    resp.status(201).json(response); //retornando um cartao
                    return;
                  });



                } else {
                  resp.location("/pagamentos/pagamento" + pagamento.id);

                  //Definindo que, após o pagamento, o próximo passo a ser seguido é "CONFIRMAR" e "CANCELAR"
                  //Colocando no formato JSON
                  //Colocando o pagamento e os links dentro do "dados_do_pagamento"
                  var response = {
                      dados_do_pagamento: pagamento,

                      //Passo a seguir aopós o pagamento criadoa
                      links: [
                          {
                              href:"http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                              rel: "Confirmar",
                              method: "PUT"
                          },
                          {
                              href:"http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                              rel: "Cancelar",
                              method: "DELETE"
                          }
                      ]
                  }
                  resp.status(201).json(response); //retornando um pagamento
                }
            }
        });
    });
}
