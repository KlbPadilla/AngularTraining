(function () {
    'use strict';
    var serviceId = 'repository.customer';
    angular.module('app').factory(serviceId, ['uow', 'lowdash', repositoryCustomer]);
    /*********************************************************
    * This factory could be refactored into a generic service  
    * Then have it create (by injection) on demand
    * to form this repository, as done in the dataservice.
    * But consider that a real life application will eventually need 
    * a place to put the Business Logic for each entity. And this is it.
    *********************************************************/
    function repositoryCustomer(uow, _) {

        var customerInlineCount;
        var customerLastCurrentpage;
        var customerLastPageSize;
        var forceRemote = false;
        var doNotcareAboutPaging = false;

        var repo = {

            getAllI: function (expand, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getCustomers(expand, null, null, filterField, filterOperator, filtervalue);
            },


            getAllF: function (filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getCustomers(null, null, null, filterField, filterOperator, filtervalue);
            },


            getAll: function () {
                doNotcareAboutPaging = true;
                return getCustomers(null, null, null, null, null, null);
            },


            getPaged: function (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getCustomers(expand, currentPage, pageSize, filterField, filterOperator, filtervalue);
            },


            getById: function (id) {
                return uow.getById('Customer', id);
            },

            create: function (customer) {
                var id = breeze.core.getUuid();
                var data = ({ CustomerId: id, IsCompany: customer.IsCompany, FirstName: customer.FirstName, MainEmail: customer.MainEmail, FacebookPage: customer.FacebookPage, TwitterPage: customer.TwitterPage, LinkedinPage: customer.LinkedinPage, SkypeId: customer.SkypeId, GooglePlusId: customer.GooglePlusId, LastName: customer.LastName, DateOfBirth: customer.DateOfBirth, SexGender: customer.SexGender, imagePath: customer.imagePath, Notes: customer.Notes, Paid: customer.Paid, Phone: customer.Phone, Address1: customer.Address1, Address2: customer.Address2, City: customer.City, State: customer.State });
                return uow.createEntity('Customer', data);
            },

            delete: function (customer) {
                return customer.entityAspect.setDeleted();
            },

      


        };

        return repo;


        function getCustomers(expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {

            var select = ['CustomerId, FirstName, LastName, IsCompany, MainEmail, FacebookPage, TwitterPage, LinkedinPage, SkypeId, GooglePlusId, DateOfBirth, SexGender, Paid, Phone, Address1, Address2, City, State'];
            //var expand = null; // No related Entities ; // to retrieve children entities values, if case you need to
            var orderby = 'FirstName';
            var entity = 'Customer';
            var resource = 'GetCustomers';

            if (customerLastPageSize && customerLastPageSize != pageSize) {
                forceRemote = true;
            } else if (customerLastCurrentpage && customerLastCurrentpage != currentPage) {
                forceRemote = true;
            }
            else if ((!customerLastPageSize || !customerLastCurrentpage) && !doNotcareAboutPaging) {
                forceRemote = true;
            }
            else {
                forceRemote = false;
            }

            customerLastPageSize = pageSize;
            customerLastCurrentpage = currentPage;
            doNotcareAboutPaging = false;

            return uow.httpGet(forceRemote, entity, resource, orderby, select, expand, currentPage, pageSize, filterField, filterOperator, filtervalue).then(function (data) {
                if (data && data.fromCache) {
                    data.totalRecords = customerInlineCount;
                    return mapBreezeToJsonInternal(data);
                } else {
                    customerInlineCount = data.totalRecords;
                    return mapBreezeToJsonInternal(data);
                }
            });
        }

        /*********************************************************
        * You may not need this DTO 
        * if you use '.noTracking()' to retrieve data from the remote server 
        * unfortunately that will also disable the cache
        * http://www.breezejs.com/documentation/querying-depth
        * so if you don't care about breeze awesome cache
        * use that parameter on the Unit of Work,  change the code
        * to remove the execution of this code (and skip or remove this DTO)
        *********************************************************/
        function mapBreezeToJsonInternal(data) {
            var mapped = _.map(data.entityResults, function (result) {
                return { 'CustomerId': result.CustomerId, 'IsCompany': result.IsCompany, 'FirstName': result.FirstName, 'MainEmail': result.MainEmail, 'FacebookPage': result.FacebookPage, 'TwitterPage': result.TwitterPage, 'LinkedinPage': result.LinkedinPage, 'SkypeId': result.SkypeId, 'GooglePlusId': result.GooglePlusId, 'LastName': result.LastName, 'DateOfBirth2': result.DateOfBirth2, 'SexGender': result.SexGender, 'imagePath': result.imagePath, 'Notes': result.Notes, 'Paid': result.Paid, 'Phone': result.Phone, 'Address1': result.Address1, 'Address2': result.Address2, 'City': result.City, 'State': result.State };
            });
            return {
                jsonResults: mapped,
                entityResults: data.entityResults,
                totalRecords: customerInlineCount,
                fromCache: data.fromCache
            };
        }



    }
})();
