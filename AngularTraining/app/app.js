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

             'bnx.module.facebook',

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

        app.run(['$rootScope', 'facebook',
    function ($rootScope, facebook) {

                $rootScope.$on('Authorization',
                function (currentScope, userData) {
                });

                $rootScope.$on ('fb.auth.authResponseChange', function(event , response) {
                  if (response == 'connected') {
                        facebook.api('me').then(function (result) {
                            $rootScope.userInfo = result;
                        });
                    } else {
                        $rootScope.userInfo = null;
                    }
                });

               facebook.login();
           
          
        }]);
})();