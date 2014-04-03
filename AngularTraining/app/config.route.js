(function () {
    'use strict';
    var app = angular.module('app');
    app.constant('routes', getRoutes());
    app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider', 'routes', routeConfigurator]);
    function routeConfigurator($urlRouterProvider, $stateProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider, routes) {
        app.register =
        {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };
        $locationProvider.html5Mode(true);
        routes.forEach(function (r) {
            $stateProvider.state(r.name, r.config);
            //debugger;
        });
        $urlRouterProvider.otherwise("index.html");
    }
    function getRoutes() {
        return [
        { name: 'login', config: { url: 'login', templateUrl: 'app/authentication/login-form.html', title: 'login', controller: '', settings: { content: '<i class="fa fa-dashboard"></i> Login' } } }, ,
        { name: 'logout', config: { url: 'logout', title: 'logout', templateUrl: 'app/authentication/login-form.html', controller: 'LogoutCtrl', settings: { content: '<i class="fa fa-calendar"></i> Logout' } } },
        { name: 'dashboard', config: { url: 'dashboard', title: 'dashboard', templateUrl: 'app/dashboard/dashboard.html', controller: '', settings: { nav: 1, content: '<i class="fa fa-calendar"></i> Dashboard' } } },

        //Customers
        { name: 'customers', config: { url: 'customers', title: 'customers', templateUrl: 'app/angularTraining/customer/customers.html', controller: '', settings: { nav: 2, content: '<i class="fa fa-calendar"></i> Customers' } } },
        { name: 'customersView', config: { url: 'customersView', title: 'customersView', templateUrl: 'app/angularTraining/customer/customersView.html', controller: '', settings: { nav: 3, content: '<i class="fa fa-calendar"></i> Customers View' }} },


        ];
    }
})();