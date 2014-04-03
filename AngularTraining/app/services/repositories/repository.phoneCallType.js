(function () {
    'use strict';
    var serviceId = 'repository.phoneCallType';
    angular.module('app').factory(serviceId, ['uow', 'lowdash', repositoryPhoneCallType]);
        /*********************************************************
        * This factory could be refactored into a generic service  
        * Then have it create (by injection) on demand
        * to form this repository, as done in the dataservice.
        * But consider that a real life application will eventually need 
        * a place to put the Business Logic for each entity. And this is it.
        *********************************************************/
    function repositoryPhoneCallType(uow, _) {
  	  
        var phoneCallTypeInlineCount;
        var phoneCallTypeLastCurrentpage;
        var phoneCallTypeLastPageSize;
        var forceRemote = false;
        var doNotcareAboutPaging = false;
  	  
        var  repo = {
         
            getAllIPhoneCallTypes: function (expand, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getPhoneCallTypes(expand, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllFPhoneCallTypes: function (filterField, filterOperator,filtervalue) {
                doNotcareAboutPaging = true;
                return getPhoneCallTypes(null, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllPhoneCallTypes: function () {
                doNotcareAboutPaging = true;
                return getPhoneCallTypes(null, null , null , null, null, null);
            },
         
         
            getPagedPhoneCallTypes: function (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getPhoneCallTypes(expand, currentPage, pageSize, filterField, filterOperator, filtervalue);
            },
         
         
            getPhoneCallTypeById: function (id) {
            return uow.getById('PhoneCallType', id); 
            },
         
            createPhoneCallType: function (phoneCallType) {
            return EntityManager.createEntity('PhoneCallType', { Type : phoneCallType.Type });
            },
          deletePhoneCallType: function (phoneCallType) {
            return phoneCallType.entityAspect.setDeleted();
            },
         
        };
  	  
        return repo;
  	  
  	  
        function getPhoneCallTypes (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
  	  
            var select = ['PhoneCallTypeId, Type'];
            //var expand = ['PhoneCalls'] ; // tells the uow to retrieve these children entities values as well if case you need to
            var orderby = 'Type';
            var entity = 'PhoneCallType';
            var resource = 'GetPhoneCallTypes';
  	  
                if (phoneCallTypeLastPageSize && phoneCallTypeLastPageSize != pageSize) {
                    forceRemote = true;
                } else if (phoneCallTypeLastCurrentpage && phoneCallTypeLastCurrentpage != currentPage) {
                    forceRemote = true;
                }
                else if ((!phoneCallTypeLastPageSize || !phoneCallTypeLastCurrentpage) && !doNotcareAboutPaging) {
                    forceRemote = true;
                }
                else {
                    forceRemote = false;
                }
  	  
                phoneCallTypeLastPageSize = pageSize;
                phoneCallTypeLastCurrentpage = currentPage;
                doNotcareAboutPaging = false;
    
              return uow.httpGet(forceRemote, entity, resource, orderby, select, expand, currentPage, pageSize, filterField, filterOperator, filtervalue).then(function (data) {
                    if (data && data.fromCache) {
                        data.totalRecords = phoneCallTypeInlineCount;
                        return mapBreezeToJsonInternal(data);
                    } else {
                        phoneCallTypeInlineCount = data.totalRecords;
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
                   return { 'PhoneCallTypeId' : result.PhoneCallTypeId, 'Type' : result.Type, 'PhoneCalls' : result.PhoneCalls };
                 });
            return {
                jsonResults: mapped,
                entityResults: data.entityResults,
                totalRecords: phoneCallTypeInlineCount,
                fromCache: data.fromCache
            };
        }
  	  
  	  
  	  
    }
})();
