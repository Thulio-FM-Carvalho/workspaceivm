var ConnectionFactory = (function () {

    var stores = ["negociacoes"];
    var version = 4;
    var dbName = "aluraframe";

    var connection = null;

    return class ConnectionFactory {

        constructor(){
            throw new Error ("Não é possível criar instancias de ConnectionFactory");
        }

        //Método de pegar conexão
        static getConnection(){
            
            //Retornando uma promise
            return new Promise((resolve, reject ) => {

                //Fazendo requisição de abertura do banco de dados
                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = evento => {
                    //Chamando o método _createStores passando a conexão
                    ConnectionFactory._createStores(evento.target.result);
                }

                openRequest.onsuccess = evento => {
                    //Se a conexão for falsa, faça
                    if(!connection){
                        connection = evento.target.result;
                        resolve(connection); //Resolvendo a conexão
                    }
                }

                openRequest.onerror = evento => {
                    console.log(evento.target.error);

                    reject(evento.target.error.name);
                    
                }
            });
        }

        static _createStores(connection) {
            //Criando sotores
            //Para cada store, faça
            stores.forEach(store => {
                //Se minha objectStore existe, faça
                if(connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store); //Apagando uma objectStore caso ela já exista 
                

                //Criando uma nova objectStore
                connection.createObjectStore(store, {autoIncrement: true});

                
            });
        }

    }
})();



