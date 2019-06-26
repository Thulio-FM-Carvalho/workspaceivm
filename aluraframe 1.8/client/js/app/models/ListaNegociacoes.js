class ListaNegociacoes {

    constructor(){
        //Criando um array de negociações
        this._negociacoes = [];
    }

    //Método que adiciona as negociações na lista
    adiciona(negociacao){
        this._negociacoes.push(negociacao);
    }

    //Método que lista as negociacoes na lista
    //Aplicando a programação defensiva, criando um array que é a cópia do array de negociações no construtor
    //Não pode alterar nada 
    get negociacoes(){
        return [].concat(this._negociacoes);
    }

    //Método que esvazia a lista de negociação negociação
    esvazia(){
        this._negociacoes = []; //Negociações recebe um array
    }
}