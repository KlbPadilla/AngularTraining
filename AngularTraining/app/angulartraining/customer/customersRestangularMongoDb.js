
(function () {
    'use strict';

  

    var controllerId = 'customersRestangularMongoDb';
    angular.module('app').controller(controllerId, ['$scope', '$modal', 'common', 'applicationData', 'mongoDbRestangular', 'authDataservice', customersRestangularMongoDb]);
    function customersRestangularMongoDb($scope, $modal, common, applicationData, mongoDbRestangular, User) {

        var user = User.getUserData();
        var antiForgeryToken = 'Bearer ' + user.bearerToken;
        var userSessionId = user.userSessionId;

      
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn();
        $scope.popup = popup;
        $scope.activate = activate;
        $scope.title = 'Customers';
        $scope.customer = '';
        $scope.customers = [];
        $scope.filteredCustomers = [];
        $scope.filteredCount = 0;
        $scope.orderby = 'lastName';
        $scope.reverse = false;

        //paging
        $scope.totalRecords = 0;
        $scope.pageSize = 10;
        $scope.currentPage = 1;

        var app = angular.module('app');
        app.config(["$httpProvider", function ($httpProvider) {
            $httpProvider.defaults.headers.common['Authorization'] = antiForgeryToken;
            $httpProvider.setDefaultRequestParams({ 'Access-Control-Allow-Origin': 'http://localhost:1499' });

            var headers = {
                'apiKey': 'enRImCZJnt80dSK-evay47L0qEZ4YV3m',
                'Authorization': antiForgeryToken,
                'Access-Control-Allow-Origin': 'http://localhost:1499',
                'Access-Control-Allow-Methods': ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Credendtials': 'true',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'

            };
            // http://localhost:28017/angularTraining/Customers/?filter_FirstName=Oscar
            //RestangularProvider.setBaseUrl('http://localhost:28017/angularTraining/');
            $httpProvider.setBaseUrl('https://api.mongolab.com/api/1/databases');
            $httpProvider.setDefaultHeaders(headers);

        }]);

        activate();

        function activate() {
            createWatches();
            common.activateController([getCustomers()], controllerId).
            then(function () {
                log('Activated Customer View');
            });
        }




        function getCustomers() {

            var queryParamObj = { role: 'admin' };
           var  headerObj = {
                'Authorization': antiForgeryToken,
                "X-UserSessionId": userSessionId
            };

        
           var a = mongoDbRestangular;
          //  debugger;

           var baseCustomers = mongoDbRestangular.all('Customers');
  
           baseCustomers.getList().then(function (data) {
               debugger;
                $scope.customers = data;
            });
         
        }

        function getCustomerById(id) {
            //return repo.getCustomerById(id).then(function (data) {
            //    return $scope.customer = data;
            //});
        }
        function openModal(data) {
            applicationData.setDataItem(data);
            var modalInstance = $modal.open({
                templateUrl: '/app/angularTraining/customer/customer.html',
                controller: 'customer',
                resolve: {
                    items: function () {
                        // return customer.items;
                    }
                }
            });
            modalInstance.result.then(function (selectedCustomer) {
                debugger;
                // customer.selected = selectedItem;
            }, function () {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        }
        function popup(selectedCustomer) {
            if (selectedCustomer && selectedCustomer.CustomerId) {
                getCustomerById(selectedCustomer.CustomerId)
                .then(function (data) {
                    openModal(data);
                });
            }
        }
        function filter(filterValue) {
            if (!filterValue) return $scope.customers;
            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < $scope.customers.length; i++) {
                var cust = $scope.customers[i];
                if (
                cust.FirstName.toLowerCase().indexOf(filterValue) > -1 ||
                cust.LastName.toLowerCase().indexOf(filterValue) > -1
                ) {
                    matches.push(cust);
                }
            }
            return matches;
        };
        function createWatches() {
            $scope.$watch("searchText", function (filterText) {
                filterCustomers(filterText);
            });
        }
        function filterCustomers(filterText) {
            $scope.filteredCustomers = filter(filterText);
            $scope.filteredCount = $scope.filteredCustomers.length;
        }
    }
})();
