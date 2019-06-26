var app = require("./config/custom-express")(); //Importando o cusom-express

//Adicionando um ouvinte na porta 3000 e fazendo uma função callback
app.listen(3000, function(){
    console.log("Servidor rodando na porta 3000")
});

