(function () {
    'use strict';
    var serviceId = 'repository.emailType';
    angular.module('app').factory(serviceId, ['uow', 'lowdash', repositoryEmailType]);
        /*********************************************************
        * This factory could be refactored into a generic service  
        * Then have it create (by injection) on demand
        * to form this repository, as done in the dataservice.
        * But consider that a real life application will eventually need 
        * a place to put the Business Logic for each entity. And this is it.
        *********************************************************/
    function repositoryEmailType(uow, _) {
  	  
        var emailTypeInlineCount;
        var emailTypeLastCurrentpage;
        var emailTypeLastPageSize;
        var forceRemote = false;
        var doNotcareAboutPaging = false;
  	  
        var  repo = {
         
            getAllIEmailTypes: function (expand, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getEmailTypes(expand, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllFEmailTypes: function (filterField, filterOperator,filtervalue) {
                doNotcareAboutPaging = true;
                return getEmailTypes(null, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllEmailTypes: function () {
                doNotcareAboutPaging = true;
                return getEmailTypes(null, null , null , null, null, null);
            },
         
         
            getPagedEmailTypes: function (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getEmailTypes(expand, currentPage, pageSize, filterField, filterOperator, filtervalue);
            },
         
         
            getEmailTypeById: function (id) {
            return uow.getById('EmailType', id); 
            },
         
            createEmailType: function (emailType) {
            return EntityManager.createEntity('EmailType', { Type : emailType.Type });
            },
          deleteEmailType: function (emailType) {
            return emailType.entityAspect.setDeleted();
            },
         
        };
  	  
        return repo;
  	  
  	  
        function getEmailTypes (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
  	  
            var select = ['EmailTypeId, Type'];
            //var expand = ['Emails'] ; // tells the uow to retrieve these children entities values as well if case you need to
            var orderby = 'Type';
            var entity = 'EmailType';
            var resource = 'GetEmailTypes';
  	  
                if (emailTypeLastPageSize && emailTypeLastPageSize != pageSize) {
                    forceRemote = true;
                } else if (emailTypeLastCurrentpage && emailTypeLastCurrentpage != currentPage) {
                    forceRemote = true;
                }
                else if ((!emailTypeLastPageSize || !emailTypeLastCurrentpage) && !doNotcareAboutPaging) {
                    forceRemote = true;
                }
                else {
                    forceRemote = false;
                }
  	  
                emailTypeLastPageSize = pageSize;
                emailTypeLastCurrentpage = currentPage;
                doNotcareAboutPaging = false;
    
              return uow.httpGet(forceRemote, entity, resource, orderby, select, expand, currentPage, pageSize, filterField, filterOperator, filtervalue).then(function (data) {
                    if (data && data.fromCache) {
                        data.totalRecords = emailTypeInlineCount;
                        return mapBreezeToJsonInternal(data);
                    } else {
                        emailTypeInlineCount = data.totalRecords;
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
                   return { 'EmailTypeId' : result.EmailTypeId, 'Type' : result.Type, 'Emails' : result.Emails };
                 });
            return {
                jsonResults: mapped,
                entityResults: data.entityResults,
                totalRecords: emailTypeInlineCount,
                fromCache: data.fromCache
            };
        }
  	  
  	  
  	  
    }
})();
