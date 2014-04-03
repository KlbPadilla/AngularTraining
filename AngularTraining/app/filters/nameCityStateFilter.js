
(function () {
    'use strict';
    var controllerId = 'nameCityStateFilter';
    angular.module('app').filter(controllerId, ['$filterProvider', nameCityStateFilter]);

    function nameCityStateFilter($filterProvider) {

        return function (customers, filterValue) {
            if (!filterValue) return customers;

            // ya todo funciona.
            // el app no tiene return asi que de nada sirve en config.rooutes
            // remover este filter y sirve

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < customers.length; i++) {
                var cust = customers[i];
                if (cust.firstName.toLowerCase().indexOf(filterValue) > -1 ||
                    cust.lastName.toLowerCase().indexOf(filterValue) > -1 ||
                    cust.city.toLowerCase().indexOf(filterValue) > -1 ||
                    cust.state.name.toLowerCase().indexOf(filterValue) > -1) {

                    matches.push(cust);

                }
            }
            return matches;
        };

    }


})();

