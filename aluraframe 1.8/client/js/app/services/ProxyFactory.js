class ProxyFactory {

    //Criando método estático para ter acesso
    //Recebe o objeto, propriedade e a ação que deverá ser executada
    static create(objeto, props, acao){
        //Criando um proxy de negociação
        //Um proxy é uma cópia de negociação, mas que atribui valores entre a negociação e o proxy
        return new Proxy(objeto, {
            
            //Interceptando uma operação de escrita para colocar na armadilha (get)
            //Passando 3 parâmetros
            //Get será chamado toda vez que eu ler a propiedade do meu objeto
            //target = objeto da negociação
            //prop = propiedade que está sendo acessada
            //recever = referência para o própio proxy
            get(target, prop, receiver) {
                
                //Métodos e funções o proxy sempre entende que é um get
                //Se "adiciona" e "esvazia está na lista do que queremos executar e é uma função, faça"
                
                if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {
                   
                     //Retorna uma nova função que substitui o "adiciona" ou "esvazia"
                     return function(){
                        console.log(`Interceptando a função ${prop}`);
                        Reflect.apply(target[prop], target, arguments); //Recebendo os parâmetros da negociação
                        return acao(target);
                        
                    }
                }

                //Se não for uma função, retorna os valores
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {
                if(props.includes(prop)) {
                    target[prop] = value;
                    acao(target);
                }
            
                return Reflect.set(target, prop, value, receiver);
            }

        });
    }

    static _ehFuncao(func){
        return typeof(func) == typeof(Function);
    }
}