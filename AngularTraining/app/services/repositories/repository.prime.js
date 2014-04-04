(function () {
    'use strict';
    var serviceId = 'repository.prime';
    angular.module('app').factory(serviceId, ['uow', '$q', 'common', repositoryPrime]);
    function repositoryPrime(uow, $q, common) {

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn();

        var expand = null;
        var currentPage = 0;
        var pageSize = 1;
        var filterValue = null;
        var filterField = null;
        var orderBy = null;

        var repo = {
            getPrimeData: function () {
                return $q.all([ getAllCustomers()]).then(function (data) {
                   // log('Prime Data successfully loaded');
                });
            }
        };
        return repo;

 


        function getAllCustomers() {
            var select = 'CustomerId';
            return uow.httpGet(true, 'Customer', 'GetCustomers', orderBy, select, expand, currentPage, pageSize, filterField, filterValue).then(function (data) {
                return data;
            });
        }



    }
})();

