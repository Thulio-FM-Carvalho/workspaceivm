class HttpService {

    //Método que recebe a url que queremos conectar
    get(url){
        return new  Promise((resolve, reject) => {

            //Instanciando o xhr
            let xhr = new XMLHttpRequest();
            xhr.open("GET", url); //Abrindo o XHR a partir do método GET na rota 
            
            //A cada mudança de estados, faça a função
            xhr.onreadystatechange = () => {
                //Se o estado for igual a 4, faça
                if(xhr.readyState == 4){
                    //Se meu status for igual a 200, "ok", faça
                    if(xhr.status == 200){
                        
                        //responseText retorna os dados que vem do servidor
                        //JSON.parse = converte arquivo JSON para objeto "array" em JS
                        
                        resolve(JSON.parse(xhr.responseText));

                    } else {
                        //responseText retorna os dados que vem do servidor
                        reject(xhr.responseText);
                        
                    }
                }
            }

            xhr.send();

        });
    }
}
