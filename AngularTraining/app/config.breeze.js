// ReSharper disable InconsistentNaming
(function () {
    'use strict';
    // app.js injects, triggering config
    angular.module('app')
    .factory('config.breeze', ['$q', '$http', 'use$q',  'applicationData', configBreeze]);
    function configBreeze($q, $http, use$q,  applicationData) {

        // this will tell the application to not to go to the remote server but use
        // data stored on the localstorage, session storage or cache
        applicationData.setDoWorkOffline = false;


        // backingStore works for Angular (ES5 property 'ready')
        breeze.config.initializeAdapterInstance('modelLibrary', 'backingStore', true);


        // use $q for promises
        use$q($q);


        //// use the current module's $http for ajax calls
        // http://stackoverflow.com/questions/21327238/breeze-using-angular-http-interceptor
        var ajax = breeze.config.initializeAdapterInstance('ajax', 'angular');
        ajax.setHttp($http);


        // Tell breeze not to validate when we attach a newly created entity to any manager.
        // We could also set this per entityManager
        new breeze.ValidationOptions({ validateOnAttach: false }).setAsDefault();

        // breeze.NamingConvention.camelCase.setAsDefault();
    }
})();