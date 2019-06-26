//Lista de todos os capos da página
//Buscando elementos pelo seletor 
var campos = [
    document.querySelector("#data"),
    document.querySelector("#quantidade"),
    document.querySelector("#valor")
];

console.log(campos);

var tbody = document.querySelector("table tbody"); //Pegando o elemento tbody

//Selecionando a classe form do index.html
//Adicionando um eventou ouvinte ao botão 
document.querySelector(".form").addEventListener("submit", function(event){
    
    event.preventDefault(); 

    var tr = document.createElement("tr"); //Criando elemento tr

    //Criando várias td's no tr
    //para cada elemento que vai varrer no array, cria uma td
    campos.forEach(function(campo){
        var td = document.createElement("td");
        td.textContent = campo.value;
        tr.appendChild(td); //Colocando o tr como filho da td
    });

    //Criando um elemento do tipo td
    //Como o volume é q quantidade * valor, faça
    var tdVolume = document.createElement("td");
    tdVolume.textContent = campos[1].value * campos[2].value;
    tr.appendChild(tdVolume); //Colocando a tr como filho da td

    tbody.appendChild(tr); //Adicionando a tr criada como filha da tbody

    //Limpando os valores ao enviar os dados
    campos[0].value = "";
    campos[1].value = 1;
    campos[2].value = 0,0;

    campos[0].focus(); //Auto focus no campo 


}); 