(function () {
    'use strict';
    var serviceId = 'repository.email';
    angular.module('app').factory(serviceId, ['uow', 'lowdash', repositoryEmail]);
        /*********************************************************
        * This factory could be refactored into a generic service  
        * Then have it create (by injection) on demand
        * to form this repository, as done in the dataservice.
        * But consider that a real life application will eventually need 
        * a place to put the Business Logic for each entity. And this is it.
        *********************************************************/
    function repositoryEmail(uow, _) {
  	  
        var emailInlineCount;
        var emailLastCurrentpage;
        var emailLastPageSize;
        var forceRemote = false;
        var doNotcareAboutPaging = false;
  	  
        var  repo = {
         
            getAllIEmails: function (expand, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getEmails(expand, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllFEmails: function (filterField, filterOperator,filtervalue) {
                doNotcareAboutPaging = true;
                return getEmails(null, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllEmails: function () {
                doNotcareAboutPaging = true;
                return getEmails(null, null , null , null, null, null);
            },
         
         
            getPagedEmails: function (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getEmails(expand, currentPage, pageSize, filterField, filterOperator, filtervalue);
            },
         
         
            getEmailById: function (id) {
            return uow.getById('Email', id); 
            },
         
            createEmail: function (email) {
            return EntityManager.createEntity('Email', { IsMain : email.IsMain, EmailTypeId : email.EmailTypeId, Id : email.Id, EmailAddress : email.EmailAddress });
            },
          deleteEmail: function (email) {
            return email.entityAspect.setDeleted();
            },
         
        };
  	  
        return repo;
  	  
  	  
        function getEmails (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
  	  
            var select = ['EmailId, EmailTypeId, IsMain, EmailAddress'];
            //var expand = null; // No related Entities ; // tells the uow to retrieve these children entities values as well if case you need to
            var orderby = 'EmailAddress';
            var entity = 'Email';
            var resource = 'GetEmails';
  	  
                if (emailLastPageSize && emailLastPageSize != pageSize) {
                    forceRemote = true;
                } else if (emailLastCurrentpage && emailLastCurrentpage != currentPage) {
                    forceRemote = true;
                }
                else if ((!emailLastPageSize || !emailLastCurrentpage) && !doNotcareAboutPaging) {
                    forceRemote = true;
                }
                else {
                    forceRemote = false;
                }
  	  
                emailLastPageSize = pageSize;
                emailLastCurrentpage = currentPage;
                doNotcareAboutPaging = false;
    
              return uow.httpGet(forceRemote, entity, resource, orderby, select, expand, currentPage, pageSize, filterField, filterOperator, filtervalue).then(function (data) {
                    if (data && data.fromCache) {
                        data.totalRecords = emailInlineCount;
                        return mapBreezeToJsonInternal(data);
                    } else {
                        emailInlineCount = data.totalRecords;
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
                   return { 'EmailId' : result.EmailId, 'IsMain' : result.IsMain, 'EmailTypeId' : result.EmailTypeId, 'Id' : result.Id, 'EmailAddress' : result.EmailAddress };
                 });
            return {
                jsonResults: mapped,
                entityResults: data.entityResults,
                totalRecords: emailInlineCount,
                fromCache: data.fromCache
            };
        }
  	  
  	  
  	  
    }
})();
