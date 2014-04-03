(function () {
    'use strict';
    var app = angular.module('app');

    // default values declared globally
    // use: var baseCustomers = Restangular.all('GetCustomers');
    app.config(function (RestangularProvider) {
        RestangularProvider.setBaseUrl('http://localhost:1499/breeze/angularTraining');
        RestangularProvider.setRequestSuffix('');
        RestangularProvider.setDefaultHttpFields({ cache: true });
        RestangularProvider.addRequestInterceptor(
             function (elem, operation, what) {
                 if (operation === 'put') {
                     elem._id = undefined;
                     return elem;
                 }
                 return elem;
             });
    });


    //Breeze Restangular Service
    //use: var baseCustomers = BreezeRestangular.all('GetCustomers');
    app.factory('breezeRestangular', function (Restangular) {
        return Restangular.withConfig(function (RestangularProvider) {
            RestangularProvider.setBaseUrl('http://localhost:1499/breeze/angularTraining');
        
        });
    });


    //MongooDb Restangular Service
    //use: var baseCustomers = mongooseRestangular.all('Customers');
    app.factory('mongoDbRestangular', function (Restangular) {
        return Restangular.withConfig(function (RestangularProvider) {
            // RestangularConfigurer.setBaseUrl('http://localhost:28017/angularTraining/');
            var headers = {
                'apiKey': 'enRImCZJnt80dSK-evay47L0qEZ4YV3m',
                'Access-Control-Allow-Origin': 'http://localhost:1499',
                'Access-Control-Allow-Methods': ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Credendtials': 'true',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            };
            // http://localhost:28017/angularTraining/Customers/?filter_FirstName=Oscar
            //RestangularProvider.setBaseUrl('http://localhost:28017/angularTraining/');
            RestangularProvider.setBaseUrl('https://api.mongolab.com/api/1/databases');
            RestangularProvider.setDefaultHeaders(headers);
        });
    });




    // Configure Toastr
    toastr.options.timeOut = 2000;
    toastr.options.positionClass = 'toast-bottom-right';

    var remoteServiceName = 'breeze/angularTraining';
    var events = {
        storage: {
            error: 'store.error',
            storeChanged: 'store.changed',
            wipChanged: 'wip.changed'
        }
    };

    var config = {
        appErrorPrefix: '[HT Error] ', //Configure the exceptionHandler decorator
        docTitle: 'Inventory: ',
        events: events,
        remoteServiceName: remoteServiceName,
        version: '2.1.0'
    };

    app.value('config', config);
    app.config(['$logProvider', function ($logProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }]);

    //#region Configure the common services via commonConfig
    app.config(['commonConfigProvider', function (cfg) {
        cfg.config.controllerActivateSuccessEvent = 'controller.activateSuccess';
        cfg.config.spinnerToggleEvent = 'spinner.toggle';
    }]);
    //#endregion
})();