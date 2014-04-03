(function () {
    'use strict';
    var serviceId = 'repository.phoneCall';
    angular.module('app').factory(serviceId, ['uow', 'lowdash', repositoryPhoneCall]);
        /*********************************************************
        * This factory could be refactored into a generic service  
        * Then have it create (by injection) on demand
        * to form this repository, as done in the dataservice.
        * But consider that a real life application will eventually need 
        * a place to put the Business Logic for each entity. And this is it.
        *********************************************************/
    function repositoryPhoneCall(uow, _) {
  	  
        var phoneCallInlineCount;
        var phoneCallLastCurrentpage;
        var phoneCallLastPageSize;
        var forceRemote = false;
        var doNotcareAboutPaging = false;
  	  
        var  repo = {
         
            getAllIPhoneCalls: function (expand, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getPhoneCalls(expand, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllFPhoneCalls: function (filterField, filterOperator,filtervalue) {
                doNotcareAboutPaging = true;
                return getPhoneCalls(null, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllPhoneCalls: function () {
                doNotcareAboutPaging = true;
                return getPhoneCalls(null, null , null , null, null, null);
            },
         
         
            getPagedPhoneCalls: function (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getPhoneCalls(expand, currentPage, pageSize, filterField, filterOperator, filtervalue);
            },
         
         
            getPhoneCallById: function (id) {
            return uow.getById('PhoneCall', id); 
            },
         
            createPhoneCall: function (phoneCall) {
            return EntityManager.createEntity('PhoneCall', { DateOfCall : phoneCall.DateOfCall, Notes : phoneCall.Notes, PhoneCallTypeId : phoneCall.PhoneCallTypeId, Id : phoneCall.Id });
            },
          deletePhoneCall: function (phoneCall) {
            return phoneCall.entityAspect.setDeleted();
            },
         
        };
  	  
        return repo;
  	  
  	  
        function getPhoneCalls (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
  	  
            var select = ['PhoneCallId, PhoneCallTypeId, DateOfCall'];
            //var expand = null; // No related Entities ; // tells the uow to retrieve these children entities values as well if case you need to
            var orderby = 'PhoneCallId';
            var entity = 'PhoneCall';
            var resource = 'GetPhoneCalls';
  	  
                if (phoneCallLastPageSize && phoneCallLastPageSize != pageSize) {
                    forceRemote = true;
                } else if (phoneCallLastCurrentpage && phoneCallLastCurrentpage != currentPage) {
                    forceRemote = true;
                }
                else if ((!phoneCallLastPageSize || !phoneCallLastCurrentpage) && !doNotcareAboutPaging) {
                    forceRemote = true;
                }
                else {
                    forceRemote = false;
                }
  	  
                phoneCallLastPageSize = pageSize;
                phoneCallLastCurrentpage = currentPage;
                doNotcareAboutPaging = false;
    
              return uow.httpGet(forceRemote, entity, resource, orderby, select, expand, currentPage, pageSize, filterField, filterOperator, filtervalue).then(function (data) {
                    if (data && data.fromCache) {
                        data.totalRecords = phoneCallInlineCount;
                        return mapBreezeToJsonInternal(data);
                    } else {
                        phoneCallInlineCount = data.totalRecords;
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
                   return { 'PhoneCallId' : result.PhoneCallId, 'DateOfCall2' : result.DateOfCall2, 'Notes' : result.Notes, 'PhoneCallTypeId' : result.PhoneCallTypeId, 'Id' : result.Id };
                 });
            return {
                jsonResults: mapped,
                entityResults: data.entityResults,
                totalRecords: phoneCallInlineCount,
                fromCache: data.fromCache
            };
        }
  	  
  	  
  	  
    }
})();
