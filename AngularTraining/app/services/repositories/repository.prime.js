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
                return $q.all([getAllAddresses(), getAllAddressTypes(), getAllAppUsers(), getAllCustomers(), getAllEmails(), getAllEmailTypes(), getAllEmployees(), getAllInvoiceDetails(), getAllInvoices(), getAllInvoiceTypes(), getAllMessages(), getAllPhoneCalls(), getAllPhoneCallTypes(), getAllPhones(), getAllPhoneTypes(), getAllProductCategories(), getAllProducts()]).then(function (data) {
                    log('Prime Data successfully loaded');
                });
            }
        };
        return repo;

        function getAllAddresses() {
            var select = 'AddressId';
            return uow.httpGet(true, 'Address', 'GetAddresses', orderBy, select, expand, currentPage, pageSize, filterField, filterValue).then(function (data) {
                return data;
            });
        }


        function getAllAddressTypes() {
            var select = 'AddressTypeId';
            return uow.httpGet(true, 'AddressType', 'GetAddressTypes', orderBy, select, expand, currentPage, pageSize, filterField, filterValue).then(function (data) {
                return data;
            });
        }


        function getAllAppUsers() {
            var select = 'UserId';
            return uow.httpGet(true, 'AppUser', 'GetAppUsers', orderBy, select, expand, currentPage, pageSize, filterField, filterValue).then(function (data) {
                return data;
            });
        }


        function getAllCustomers() {
            var select = 'CustomerId';
            return uow.httpGet(true, 'Customer', 'GetCustomers', orderBy, select, expand, currentPage, pageSize, filterField, filterValue).then(function (data) {
                return data;
            });
        }


        function getAllEmails() {
            var select = 'EmailId';
            return uow.httpGet(true, 'Email', 'GetEmails', orderBy, select, expand, currentPage, pageSize, filterField, filterValue).then(function (data) {
                return data;
            });
        }


        function getAllEmailTypes() {
            var select = 'EmailTypeId';
            return uow.httpGet(true, 'EmailType', 'GetEmailTypes', orderBy, select, expand, currentPage, pageSize, filterField, filterValue).then(function (data) {
                return data;
            });
        }


        function getAllEmployees() {
            var select = 'EmployeeId';
            return uow.httpGet(true, 'Employee', 'GetEmployees', orderBy, select, expand, currentPage, pageSize, filterField, filterValue).then(function (data) {
                return data;
            });
        }


        function getAllInvoiceDetails() {
            var select = 'InvoiceDetailId';
            return uow.httpGet(true, 'InvoiceDetail', 'GetInvoiceDetails', orderBy, select, expand, currentPage, pageSize, filterField, filterValue).then(function (data) {
                return data;
            });
        }


        function getAllInvoices() {
            var select = 'InvoiceId';
            return uow.httpGet(true, 'Invoice', 'GetInvoices', orderBy, select, expand, currentPage, pageSize, filterField, filterValue).then(function (data) {
                return data;
            });
        }


        function getAllInvoiceTypes() {
            var select = 'InvoiceTypeId';
            return uow.httpGet(true, 'InvoiceType', 'GetInvoiceTypes', orderBy, select, expand, currentPage, pageSize, filterField, filterValue).then(function (data) {
                return data;
            });
        }


        function getAllMessages() {
            var select = 'MessageId';
            return uow.httpGet(true, 'Message', 'GetMessages', orderBy, select, expand, currentPage, pageSize, filterField, filterValue).then(function (data) {
                return data;
            });
        }


        function getAllPhoneCalls() {
            var select = 'PhoneCallId';
            return uow.httpGet(true, 'PhoneCall', 'GetPhoneCalls', orderBy, select, expand, currentPage, pageSize, filterField, filterValue).then(function (data) {
                return data;
            });
        }


        function getAllPhoneCallTypes() {
            var select = 'PhoneCallTypeId';
            return uow.httpGet(true, 'PhoneCallType', 'GetPhoneCallTypes', orderBy, select, expand, currentPage, pageSize, filterField, filterValue).then(function (data) {
                return data;
            });
        }


        function getAllPhones() {
            var select = 'PhoneId';
            return uow.httpGet(true, 'Phone', 'GetPhones', orderBy, select, expand, currentPage, pageSize, filterField, filterValue).then(function (data) {
                return data;
            });
        }


        function getAllPhoneTypes() {
            var select = 'PhoneTypeId';
            return uow.httpGet(true, 'PhoneType', 'GetPhoneTypes', orderBy, select, expand, currentPage, pageSize, filterField, filterValue).then(function (data) {
                return data;
            });
        }


        function getAllProductCategories() {
            var select = 'ProductCategoryId';
            return uow.httpGet(true, 'ProductCategory', 'GetProductCategories', orderBy, select, expand, currentPage, pageSize, filterField, filterValue).then(function (data) {
                return data;
            });
        }


        function getAllProducts() {
            var select = 'ProductId';
            return uow.httpGet(true, 'Product', 'GetProducts', orderBy, select, expand, currentPage, pageSize, filterField, filterValue).then(function (data) {
                return data;
            });
        }


    }
})();

