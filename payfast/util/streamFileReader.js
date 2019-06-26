var fs = require("fs");

//Função responsável por criar um fluxo de leitura para ler um arquivo
fs.createReadStream("imagem.jpg")
  //Criando uma pipeline de execução
  .pipe(fs.createWriteStream("imagem-com-stream.jpg"))
  .on("finish", function(){
    console.log("Arquivo escrito com Stream!");
  });
  //Possibilidade de escrever listeners
