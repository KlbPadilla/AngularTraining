(function () {
    'use strict';
    var serviceId = 'repository.address';
    angular.module('app').factory(serviceId, ['uow', 'lowdash', repositoryAddress]);
        /*********************************************************
        * This factory could be refactored into a generic service  
        * Then have it create (by injection) on demand
        * to form this repository, as done in the dataservice.
        * But consider that a real life application will eventually need 
        * a place to put the Business Logic for each entity. And this is it.
        *********************************************************/
    function repositoryAddress(uow, _) {
  	  
        var addressInlineCount;
        var addressLastCurrentpage;
        var addressLastPageSize;
        var forceRemote = false;
        var doNotcareAboutPaging = false;
  	  
        var  repo = {
         
            getAllIAddresses: function (expand, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getAddresses(expand, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllFAddresses: function (filterField, filterOperator,filtervalue) {
                doNotcareAboutPaging = true;
                return getAddresses(null, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllAddresses: function () {
                doNotcareAboutPaging = true;
                return getAddresses(null, null , null , null, null, null);
            },
         
         
            getPagedAddresses: function (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getAddresses(expand, currentPage, pageSize, filterField, filterOperator, filtervalue);
            },
         
         
            getAddressById: function (id) {
            return uow.getById('Address', id); 
            },
         
            createAddress: function (address) {
            return EntityManager.createEntity('Address', { IsMain : address.IsMain, Address1 : address.Address1, Address2 : address.Address2, State : address.State, Notes : address.Notes, Zip : address.Zip, Country : address.Country, AddressTypeId : address.AddressTypeId, Id : address.Id });
            },
          deleteAddress: function (address) {
            return address.entityAspect.setDeleted();
            },
         
        };
  	  
        return repo;
  	  
  	  
        function getAddresses (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
  	  
            var select = ['AddressId, AddressTypeId, IsMain, Address1, Address2, State, Zip, Country'];
            //var expand = null; // No related Entities ; // tells the uow to retrieve these children entities values as well if case you need to
            var orderby = 'Address1';
            var entity = 'Address';
            var resource = 'GetAddresses';
  	  
                if (addressLastPageSize && addressLastPageSize != pageSize) {
                    forceRemote = true;
                } else if (addressLastCurrentpage && addressLastCurrentpage != currentPage) {
                    forceRemote = true;
                }
                else if ((!addressLastPageSize || !addressLastCurrentpage) && !doNotcareAboutPaging) {
                    forceRemote = true;
                }
                else {
                    forceRemote = false;
                }
  	  
                addressLastPageSize = pageSize;
                addressLastCurrentpage = currentPage;
                doNotcareAboutPaging = false;
    
              return uow.httpGet(forceRemote, entity, resource, orderby, select, expand, currentPage, pageSize, filterField, filterOperator, filtervalue).then(function (data) {
                    if (data && data.fromCache) {
                        data.totalRecords = addressInlineCount;
                        return mapBreezeToJsonInternal(data);
                    } else {
                        addressInlineCount = data.totalRecords;
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
                   return { 'AddressId' : result.AddressId, 'IsMain' : result.IsMain, 'Address1' : result.Address1, 'Address2' : result.Address2, 'State' : result.State, 'Notes' : result.Notes, 'Zip' : result.Zip, 'Country' : result.Country, 'AddressTypeId' : result.AddressTypeId, 'Id' : result.Id };
                 });
            return {
                jsonResults: mapped,
                entityResults: data.entityResults,
                totalRecords: addressInlineCount,
                fromCache: data.fromCache
            };
        }
  	  
  	  
  	  
    }
})();
