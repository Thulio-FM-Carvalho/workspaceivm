//Classe responsável por importar o serviço de negociações
class NegociacaoService {

    constructor(){
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana(){

        //Passando como parâmetro o resolve e reject
        //resolve = retorno de sucesso
        //reject = erro
        return new Promise((resolve, reject) => {

              //Pedindo pro serviço buscar as negociações da semana  
              this._http
                .get("negociacoes/semana")          
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject("Não foi possível obter as negociações da semana!")
                    
                })  
        });
    }


    obterNegociacoesDaSemanaAnterior(){

        //Passando como parâmetro o resolve e reject
        //resolve = retorno de sucesso
        //reject = erro
        return new Promise((resolve, reject) => {

            //Pedindo pro serviço buscar as negociações da semana  
            this._http
              .get("negociacoes/anterior")          
              .then(negociacoes => {
                  resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
              })
              .catch(erro => {
                  console.log(erro);
                  reject("Não foi possível obter as negociações da semana anterior!")
                  
              })  
      });
    }

    obterNegociacoesDaSemanaRetrasada(){

        //Passando como parâmetro o resolve e reject
        //resolve = retorno de sucesso
        //reject = erro
        return new Promise((resolve, reject) => {

            //Pedindo pro serviço buscar as negociações da semana  
            this._http
              .get("negociacoes/retrasada")          
              .then(negociacoes => {
                  resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
              })
              .catch(erro => {
                  console.log(erro);
                  reject("Não foi possível obter as negociações da semana retrasada!")
                  
              })  
      });
    }
}

