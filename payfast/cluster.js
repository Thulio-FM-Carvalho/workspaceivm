//CÓDIGO RESPONSÁVEL POR FAZER A THREAD TRABALHAR SOMENTE COM UM NÚCLEO DO PROCESSADOR

var cluster = require("cluster");
var os = require("os"); //Informações do sistema operacional

//Pergunta quantos cpus a máquina tem
var cpus = os.cpus();
console.log(cpus);

//Cria uma nova trhead que passa a ser filha da thread principal
console.log("Executando thread");

//Se o cluster for mestre, faça
if (cluster.isMaster) {
  console.log("Thread Master");
    cluster.fork(function(){
    cluster.fork();
  });

  //Para cada um das threads, faça cpus.fork
  cpus.forEach(){

  }
} else {
  console.log("Thread slave");
}
