(function () {
    'use strict';
    var app = angular.module('app', [
            // Angular modules
            'ngCookies',
            'ngResource',
            'ui.router',
            'ngAnimate', // animations
            'ngRoute', // routing
            'ngSanitize', // sanitizes html bindings (ex: sidebar.js)
            'common', // common functions, logger, spinner
            'ui.bootstrap', // ui-bootstrap (ex: carousel, pagination, dialog)
            'breeze.angular.q', // tells breeze to use $q instead of Q.js
            'breeze.directives',
            //'ngGrid',
        
            'restangular',
            'ngzWip', // local storage and WIP module
            //'ionic'
            //'mobile-angular-ui',
            //'mobile-angular-ui.touch',
            //'mobile-angular-ui.scrollable'
    ]);

        app.service('analytics', [
        '$rootScope', '$window', '$location', function ($rootScope, $window, $location) {
            var send = function (evt, data) {
                ga('send', evt, data);
            }
        }
        ]);

    app.run(['$rootScope', '$q', '$state',  'common',
    function ($rootScope, $q, $state, common) {

                $rootScope.$on('Authorization',
                function (currentScope, userData) {
                });

            var getLogFn = common.logger.getLogFn;
            var log = getLogFn();
          
        }]);
})();