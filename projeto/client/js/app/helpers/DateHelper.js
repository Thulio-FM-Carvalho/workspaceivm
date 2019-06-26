//Classe responsável por lidar com a data
//Static = Os métodos declarados com static podem ser usados sem ser instanciados 
class DateHelper {
    
    constructor(){
        //Lança um erro dizendo que não é necessário instanciar, pois os métodos já estão em static
        throw  new Error("DateHelper não pode ser instanciada");
    }

    //Método que converte texto para data
    static dataParaTexto(data){

        //Utilizando o teplate String
        return `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;

    }

    static textoParaData(texto){
        
        return new Date(...texto.split("-")
        //.item = posição do array, no caso o mês que tá na 2 posição e é o que queremos mudar
        //indice = elemento que ele está varrendo
        .map((item, indice) => item - indice % 2));

    }
}