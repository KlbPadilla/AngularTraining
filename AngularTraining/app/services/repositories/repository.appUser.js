(function () {
    'use strict';
    var serviceId = 'repository.appUser';
    angular.module('app').factory(serviceId, ['uow', 'lowdash', repositoryAppUser]);
        /*********************************************************
        * This factory could be refactored into a generic service  
        * Then have it create (by injection) on demand
        * to form this repository, as done in the dataservice.
        * But consider that a real life application will eventually need 
        * a place to put the Business Logic for each entity. And this is it.
        *********************************************************/
    function repositoryAppUser(uow, _) {
  	  
        var appUserInlineCount;
        var appUserLastCurrentpage;
        var appUserLastPageSize;
        var forceRemote = false;
        var doNotcareAboutPaging = false;
  	  
        var  repo = {
         
            getAllIAppUsers: function (expand, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getAppUsers(expand, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllFAppUsers: function (filterField, filterOperator,filtervalue) {
                doNotcareAboutPaging = true;
                return getAppUsers(null, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllAppUsers: function () {
                doNotcareAboutPaging = true;
                return getAppUsers(null, null , null , null, null, null);
            },
         
         
            getPagedAppUsers: function (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getAppUsers(expand, currentPage, pageSize, filterField, filterOperator, filtervalue);
            },
         
         
            getAppUserById: function (id) {
            return uow.getById('AppUser', id); 
            },
         
            createAppUser: function (appUser) {
            return EntityManager.createEntity('AppUser', { Name : appUser.Name, SecurityLevel : appUser.SecurityLevel });
            },
          deleteAppUser: function (appUser) {
            return appUser.entityAspect.setDeleted();
            },
         
        };
  	  
        return repo;
  	  
  	  
        function getAppUsers (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
  	  
            var select = ['UserId'];
            //var expand = null; // No related Entities ; // tells the uow to retrieve these children entities values as well if case you need to
            var orderby = 'SecurityLevel';
            var entity = 'AppUser';
            var resource = 'GetAppUsers';
  	  
                if (appUserLastPageSize && appUserLastPageSize != pageSize) {
                    forceRemote = true;
                } else if (appUserLastCurrentpage && appUserLastCurrentpage != currentPage) {
                    forceRemote = true;
                }
                else if ((!appUserLastPageSize || !appUserLastCurrentpage) && !doNotcareAboutPaging) {
                    forceRemote = true;
                }
                else {
                    forceRemote = false;
                }
  	  
                appUserLastPageSize = pageSize;
                appUserLastCurrentpage = currentPage;
                doNotcareAboutPaging = false;
    
              return uow.httpGet(forceRemote, entity, resource, orderby, select, expand, currentPage, pageSize, filterField, filterOperator, filtervalue).then(function (data) {
                    if (data && data.fromCache) {
                        data.totalRecords = appUserInlineCount;
                        return mapBreezeToJsonInternal(data);
                    } else {
                        appUserInlineCount = data.totalRecords;
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
                   return { 'UserId' : result.UserId, 'Name' : result.Name, 'SecurityLevel' : result.SecurityLevel };
                 });
            return {
                jsonResults: mapped,
                entityResults: data.entityResults,
                totalRecords: appUserInlineCount,
                fromCache: data.fromCache
            };
        }
  	  
  	  
  	  
    }
})();
