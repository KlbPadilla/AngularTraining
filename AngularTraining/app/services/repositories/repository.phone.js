(function () {
    'use strict';
    var serviceId = 'repository.phone';
    angular.module('app').factory(serviceId, ['uow', 'lowdash', repositoryPhone]);
        /*********************************************************
        * This factory could be refactored into a generic service  
        * Then have it create (by injection) on demand
        * to form this repository, as done in the dataservice.
        * But consider that a real life application will eventually need 
        * a place to put the Business Logic for each entity. And this is it.
        *********************************************************/
    function repositoryPhone(uow, _) {
  	  
        var phoneInlineCount;
        var phoneLastCurrentpage;
        var phoneLastPageSize;
        var forceRemote = false;
        var doNotcareAboutPaging = false;
  	  
        var  repo = {
         
            getAllIPhones: function (expand, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getPhones(expand, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllFPhones: function (filterField, filterOperator,filtervalue) {
                doNotcareAboutPaging = true;
                return getPhones(null, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllPhones: function () {
                doNotcareAboutPaging = true;
                return getPhones(null, null , null , null, null, null);
            },
         
         
            getPagedPhones: function (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getPhones(expand, currentPage, pageSize, filterField, filterOperator, filtervalue);
            },
         
         
            getPhoneById: function (id) {
            return uow.getById('Phone', id); 
            },
         
            createPhone: function (phone) {
            return EntityManager.createEntity('Phone', { IsMain : phone.IsMain, Number : phone.Number, IsCellPhone : phone.IsCellPhone, PhoneTypeId : phone.PhoneTypeId, Id : phone.Id, Extension : phone.Extension });
            },
          deletePhone: function (phone) {
            return phone.entityAspect.setDeleted();
            },
         
        };
  	  
        return repo;
  	  
  	  
        function getPhones (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
  	  
            var select = ['PhoneId, PhoneTypeId, IsMain, Number, IsCellPhone, Extension'];
            //var expand = null; // No related Entities ; // tells the uow to retrieve these children entities values as well if case you need to
            var orderby = 'Number';
            var entity = 'Phone';
            var resource = 'GetPhones';
  	  
                if (phoneLastPageSize && phoneLastPageSize != pageSize) {
                    forceRemote = true;
                } else if (phoneLastCurrentpage && phoneLastCurrentpage != currentPage) {
                    forceRemote = true;
                }
                else if ((!phoneLastPageSize || !phoneLastCurrentpage) && !doNotcareAboutPaging) {
                    forceRemote = true;
                }
                else {
                    forceRemote = false;
                }
  	  
                phoneLastPageSize = pageSize;
                phoneLastCurrentpage = currentPage;
                doNotcareAboutPaging = false;
    
              return uow.httpGet(forceRemote, entity, resource, orderby, select, expand, currentPage, pageSize, filterField, filterOperator, filtervalue).then(function (data) {
                    if (data && data.fromCache) {
                        data.totalRecords = phoneInlineCount;
                        return mapBreezeToJsonInternal(data);
                    } else {
                        phoneInlineCount = data.totalRecords;
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
        * use that parameter on the Unit of Work and change the code
        * and change the code to skip this DTO
        *********************************************************/
        function mapBreezeToJsonInternal(data) {
            var mapped = _.map(data.entityResults, function (result) {
                   return { 'PhoneId' : result.PhoneId, 'IsMain' : result.IsMain, 'Number' : result.Number, 'IsCellPhone' : result.IsCellPhone, 'PhoneTypeId' : result.PhoneTypeId, 'Id' : result.Id, 'Extension' : result.Extension };
                 });
            return {
                jsonResults: mapped,
                entityResults: data.entityResults,
                totalRecords: phoneInlineCount,
                fromCache: data.fromCache
            };
        }
  	  
  	  
  	  
    }
})();
