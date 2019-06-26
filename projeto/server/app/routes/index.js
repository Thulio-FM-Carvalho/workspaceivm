/* Código simplório, apenas para fornecer o serviço para a aplicação */

var api = require('../api');

module.exports  = function(app) {
    
    app.route('/grupos/atual')
        .get(api.listaGrupos);
        
    // app.route('/negociacoes/anterior')
    //     .get(api.listaAnterior);
        
    // app.route('/negociacoes/retrasada')
    //     .get(api.listaRetrasada);  
        
    app.route('/grupos')
        .post(api.cadastraGrupos);          
};