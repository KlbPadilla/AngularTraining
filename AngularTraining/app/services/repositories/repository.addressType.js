(function () {
    'use strict';
    var serviceId = 'repository.addressType';
    angular.module('app').factory(serviceId, ['uow', 'lowdash', repositoryAddressType]);
        /*********************************************************
        * This factory could be refactored into a generic service  
        * Then have it create (by injection) on demand
        * to form this repository, as done in the dataservice.
        * But consider that a real life application will eventually need 
        * a place to put the Business Logic for each entity. And this is it.
        *********************************************************/
    function repositoryAddressType(uow, _) {
  	  
        var addressTypeInlineCount;
        var addressTypeLastCurrentpage;
        var addressTypeLastPageSize;
        var forceRemote = false;
        var doNotcareAboutPaging = false;
  	  
        var  repo = {
         
            getAllIAddressTypes: function (expand, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getAddressTypes(expand, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllFAddressTypes: function (filterField, filterOperator,filtervalue) {
                doNotcareAboutPaging = true;
                return getAddressTypes(null, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllAddressTypes: function () {
                doNotcareAboutPaging = true;
                return getAddressTypes(null, null , null , null, null, null);
            },
         
         
            getPagedAddressTypes: function (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getAddressTypes(expand, currentPage, pageSize, filterField, filterOperator, filtervalue);
            },
         
         
            getAddressTypeById: function (id) {
            return uow.getById('AddressType', id); 
            },
         
            createAddressType: function (addressType) {
            return EntityManager.createEntity('AddressType', { Type : addressType.Type });
            },
          deleteAddressType: function (addressType) {
            return addressType.entityAspect.setDeleted();
            },
         
        };
  	  
        return repo;
  	  
  	  
        function getAddressTypes (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
  	  
            var select = ['AddressTypeId, Type'];
            //var expand = ['Addresses'] ; // tells the uow to retrieve these children entities values as well if case you need to
            var orderby = 'Type';
            var entity = 'AddressType';
            var resource = 'GetAddressTypes';
  	  
                if (addressTypeLastPageSize && addressTypeLastPageSize != pageSize) {
                    forceRemote = true;
                } else if (addressTypeLastCurrentpage && addressTypeLastCurrentpage != currentPage) {
                    forceRemote = true;
                }
                else if ((!addressTypeLastPageSize || !addressTypeLastCurrentpage) && !doNotcareAboutPaging) {
                    forceRemote = true;
                }
                else {
                    forceRemote = false;
                }
  	  
                addressTypeLastPageSize = pageSize;
                addressTypeLastCurrentpage = currentPage;
                doNotcareAboutPaging = false;
    
              return uow.httpGet(forceRemote, entity, resource, orderby, select, expand, currentPage, pageSize, filterField, filterOperator, filtervalue).then(function (data) {
                    if (data && data.fromCache) {
                        data.totalRecords = addressTypeInlineCount;
                        return mapBreezeToJsonInternal(data);
                    } else {
                        addressTypeInlineCount = data.totalRecords;
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
                   return { 'AddressTypeId' : result.AddressTypeId, 'Type' : result.Type, 'Addresses' : result.Addresses };
                 });
            return {
                jsonResults: mapped,
                entityResults: data.entityResults,
                totalRecords: addressTypeInlineCount,
                fromCache: data.fromCache
            };
        }
  	  
  	  
  	  
    }
})();
