class ListaGrupos {

    constructor(){
        //Criando um array de negociações
        this._grupos = [];
    }

    //Método que adiciona as negociações na lista
    adiciona(grupo){
        this._grupos.push(grupo);
    }

    //Método que lista as negociacoes na lista
    //Aplicando a programação defensiva, criando um array que é a cópia do array de negociações no construtor
    //Não pode alterar nada 
    get grupos(){
        return [].concat(this._grupos);
    }

    //Método que esvazia a lista de negociação negociação
    esvazia(){
        this._grupos = []; //Negociações recebe um array
    }
}