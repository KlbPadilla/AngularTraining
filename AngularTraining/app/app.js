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


    'restangular',
    'ngzWip', // local storage and WIP module
    'facebook',


    ]);


    app.config([
    'FacebookProvider',
    function (FacebookProvider) {
        var myAppId = '588374771270112';
       // facebookProvider.init({ appId: "588374771270112" });
        FacebookProvider.init(myAppId);
    }])

    app.service('analytics', [
    '$rootScope', '$window', '$location', function ($rootScope, $window, $location) {
        var send = function (evt, data) {
            ga('send', evt, data);
        }
    }]);

    app.run(['$rootScope', 
    function ($rootScope) {
        $rootScope.$on('Authorization',
        function (currentScope, userData) {
        });



       
    }]);

})();