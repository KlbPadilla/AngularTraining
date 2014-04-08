(function () {
    'use strict';
    var app = angular.module('app');

  





    // Configure Toastr
    toastr.options.timeOut = 4000;
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

    //app.config(['facebookProvider', function (facebookProvider) {
    //    facebookProvider.init({ appId: "588374771270112" });
    //}]);

  //  app.config([
  //'FacebookProvider',
  //function(FacebookProvider) {
  //    var myAppId = '423840851054944';
     
  //    // You can set appId with setApp method
  //    // FacebookProvider.setAppId('myAppId');
     
  //    /**
  //     * After setting appId you need to initialize the module.
  //     * You can pass the appId on the init method as a shortcut too.
  //     */
  //    FacebookProvider.init(myAppId);
     
  //}
  //  ])


    //#endregion
})();