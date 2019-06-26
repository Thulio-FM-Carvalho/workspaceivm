//Código responsável por escrever loggers de um serviço
var winston = require("winston");

//Instanciando um novo logger
var logger = new winston.createLogger({
  //Criando uma logger trasnports
  transports:
  [
      //Criar uma logger em um arquivo
      new winston.transports.File({
        level: "info",  //Nome do nível
        filename: "logs/payfast.log", //Nome do arquivo
        maxsize: 100000, //Tamanho máximo do arquivo
        maxFiles: 10 //Quantidade de arquivos para cada log
      })
  ]
});

//Função que escreve um log
logger.log("Log utilizando um winston");
logger.log("info", "Log utilizando winston e info");
logger.info("Log mais maroto!");
