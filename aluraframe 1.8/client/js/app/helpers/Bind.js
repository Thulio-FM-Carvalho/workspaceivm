//Classe de associação
//Classe responsável por configurar o proxy e deixar ele instanciável
//... =  recebendo a props como um array, recebendo o "adiciona" e a "esvazia"
class Bind {
        constructor(model, view, ...props) { //Recebe o modelo, a view, e a propriedade
        
        //Criando um proxy, passando o modelo, a propriedade e a ação (arrow function)
        let proxy = ProxyFactory.create(model, props, model => view.update(model));

        view.update(model); //Atualizando a view

        return proxy;
    }
}