(function () {
    'use strict';
    var serviceId = 'repository.phoneType';
    angular.module('app').factory(serviceId, ['uow', 'lowdash', repositoryPhoneType]);
        /*********************************************************
        * This factory could be refactored into a generic service  
        * Then have it create (by injection) on demand
        * to form this repository, as done in the dataservice.
        * But consider that a real life application will eventually need 
        * a place to put the Business Logic for each entity. And this is it.
        *********************************************************/
    function repositoryPhoneType(uow, _) {
  	  
        var phoneTypeInlineCount;
        var phoneTypeLastCurrentpage;
        var phoneTypeLastPageSize;
        var forceRemote = false;
        var doNotcareAboutPaging = false;
  	  
        var  repo = {
         
            getAllIPhoneTypes: function (expand, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getPhoneTypes(expand, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllFPhoneTypes: function (filterField, filterOperator,filtervalue) {
                doNotcareAboutPaging = true;
                return getPhoneTypes(null, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllPhoneTypes: function () {
                doNotcareAboutPaging = true;
                return getPhoneTypes(null, null , null , null, null, null);
            },
         
         
            getPagedPhoneTypes: function (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getPhoneTypes(expand, currentPage, pageSize, filterField, filterOperator, filtervalue);
            },
         
         
            getPhoneTypeById: function (id) {
            return uow.getById('PhoneType', id); 
            },
         
            createPhoneType: function (phoneType) {
            return EntityManager.createEntity('PhoneType', { Type : phoneType.Type });
            },
          deletePhoneType: function (phoneType) {
            return phoneType.entityAspect.setDeleted();
            },
         
        };
  	  
        return repo;
  	  
  	  
        function getPhoneTypes (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
  	  
            var select = ['PhoneTypeId, Type'];
            //var expand = ['Phones'] ; // tells the uow to retrieve these children entities values as well if case you need to
            var orderby = 'Type';
            var entity = 'PhoneType';
            var resource = 'GetPhoneTypes';
  	  
                if (phoneTypeLastPageSize && phoneTypeLastPageSize != pageSize) {
                    forceRemote = true;
                } else if (phoneTypeLastCurrentpage && phoneTypeLastCurrentpage != currentPage) {
                    forceRemote = true;
                }
                else if ((!phoneTypeLastPageSize || !phoneTypeLastCurrentpage) && !doNotcareAboutPaging) {
                    forceRemote = true;
                }
                else {
                    forceRemote = false;
                }
  	  
                phoneTypeLastPageSize = pageSize;
                phoneTypeLastCurrentpage = currentPage;
                doNotcareAboutPaging = false;
    
              return uow.httpGet(forceRemote, entity, resource, orderby, select, expand, currentPage, pageSize, filterField, filterOperator, filtervalue).then(function (data) {
                    if (data && data.fromCache) {
                        data.totalRecords = phoneTypeInlineCount;
                        return mapBreezeToJsonInternal(data);
                    } else {
                        phoneTypeInlineCount = data.totalRecords;
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
                   return { 'PhoneTypeId' : result.PhoneTypeId, 'Type' : result.Type, 'Phones' : result.Phones };
                 });
            return {
                jsonResults: mapped,
                entityResults: data.entityResults,
                totalRecords: phoneTypeInlineCount,
                fromCache: data.fromCache
            };
        }
  	  
  	  
  	  
    }
})();
