//Classe responsável por disparar as mensagens
class Mensagem {
    constructor(texto=''){
        this._texto = texto;
    }

    get texto(){
        return this._texto;
    }

    set texto(texto){
        this._texto = texto;
    }
}