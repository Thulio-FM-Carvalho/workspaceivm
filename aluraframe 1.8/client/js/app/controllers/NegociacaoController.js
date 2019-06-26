//Chamando ação no controller
class NegociacaoController {
    
    constructor(){
        
        let $ = document.querySelector.bind(document); //.bind trazendo o document ao query selector 
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade"); //Importando quantidade
        this._inputValor = $("#valor");

        //Associando a listaNegociacoes a view e só irá acontecer quando os métodos forem chamados
        //Instanciando:                         modelo                      view                                    condição 
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), "adiciona", "esvazia");

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), "texto");
        
       
    }

    //Criando método adiciona
    adiciona(event){
        
            event.preventDefault();

            this._listaNegociacoes.adiciona(this._criaNegociacao()); //Cria uma lista de negociação e adiciona a negociação 
            
            this._mensagem.texto = "Negociação adicionada com sucesso!";

            this._limpaFormulario();                                 //Chamando o método de limpar o formulário
    }
    
    //Método responsável por instanciar o serviço de negociações
    importaNegociacoes(){
        
        let service = new NegociacaoService();

        //Recebendo uma lista de primise
        Promise.all([
            service.obterNegociacoesDaSemana(),
            service.obterNegociacoesDaSemanaAnterior(),
            service.obterNegociacoesDaSemanaRetrasada()
            ]).then(negociacoes => {
                
                //Reduce = Rechebendo os elementos do array para um unico elemento contendo todos os arrays    
                negociacoes
                .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            })
            .catch(error => this._mensagem.texto = error);
    }
    //Método que cria a negociação
    _criaNegociacao(){
        return new Negociacao(
            //Acessando o método textoParaData através da propiedade static definida no DateHelper
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);
        }

    //Método de limpar o formulário
    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();   
    }

    apaga(){
        this._listaNegociacoes.esvazia(); //Chamando o método esvazia
       
        this._mensagem.texto = "Lista de negocações apagadas com sucesso!"
    }
}

