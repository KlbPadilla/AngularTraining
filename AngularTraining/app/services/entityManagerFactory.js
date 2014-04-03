(function () {
    'use strict';
    var serviceId = 'entityManagerFactory';
    angular.module('app').factory(serviceId, ['config','config.breeze', 'model', '$q', '$http', 'use$q', emFactory]);
    function emFactory(config,configBreeze, model, $q, $http, use$q) {


        var configBreeze = configBreeze; // the js class is called

        var serviceName = config.remoteServiceName;
  
        var metadataStore = createMetadataStore();

        var jsonResultsAdapter = new breeze.JsonResultsAdapter({
            name: "test1e",
            extractResults: function (json) {
                if (json == null) {
                  
                    return {};
                } else {
                    return json.results;
                }
             
            },
            visitNode: function (node, mappingContext, nodeContext) {
                return {};
            }
        });



        var dataService = new breeze.DataService({
            serviceName: serviceName,
          //  jsonResultsAdapter: jsonResultsAdapter,
        });


        var provider = {
            metadataStore: metadataStore,
            newManager: newManager
        };

        return provider;

        function createMetadataStore() {
            var store = new breeze.MetadataStore();
            // we are not only getting a new metadatastore we are also extending the meetadatastore
            model.configureMetadataStore(store);
            return store;
        }

        function newManager() {
            var mgr = new breeze.EntityManager({
                dataService: dataService,
                metadataStore: metadataStore,
                configBreeze: configBreeze,
                
            });

            return mgr;
        }
    }
})();