//CODIGO RESPONSÁVEL POR LER ARQUIVOS

//fs = File System
var fs = require("fs"); //Importando a lib

//Função de ler arquivo
//Lendo a imagem JPG e adicionando uma função de callback
fs.readFile("imagem.jpg", function(erro, buffer){
  console.log("O arquivo foi lido!");

  //Código que escreve o arquivo
  //Passando 2 parâmetros
  fs.writeFile("imagem2.jpg", buffer, function(erro){
    console.log("O arquivo foi escrito!");
  });
});
