/* CÓDIGO RESPONSÁVEL POR CRIAR O SERVIDOR */

const http = require ("http"); //Importando um módulo HTTP

//Método de criação do servidor
//req = requisição
//resp = resposta
const servidor = http.createServer(function (req, resp) {
    resp.end(`
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1> Casa do Código </h1>
                </body> 
            </html>
    `)
});
//Fazendo servidor escutar a porta 3000 
servidor.listen(3000)