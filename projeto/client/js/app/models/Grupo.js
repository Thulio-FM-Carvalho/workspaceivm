class Grupo {
    
    //Definindo um construtor
    //Definindo as características da classe com seus respectivos valores padrão!
    constructor(data, quantidade, valor){
        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;
        Object.freeze(this); //Todo objeto que será instanciado será congelado
    }

    //Criando um método de acesso ao volume
    get volume(){
        return this._quantidade * this._valor;
    }

    //MÉTODOS DE ACESSO AOS DADOS
    get data(){
        return new Date(this._data.getTime());
    }

    get quantidade(){
        return this._quantidade;
    }

    get valor(){
        return this._valor;
    }
}