(function () {
    'use strict';
    var serviceId = 'repository.message';
    angular.module('app').factory(serviceId, ['uow', 'lowdash', repositoryMessage]);
        /*********************************************************
        * This factory could be refactored into a generic service  
        * Then have it create (by injection) on demand
        * to form this repository, as done in the dataservice.
        * But consider that a real life application will eventually need 
        * a place to put the Business Logic for each entity. And this is it.
        *********************************************************/
    function repositoryMessage(uow, _) {
  	  
        var messageInlineCount;
        var messageLastCurrentpage;
        var messageLastPageSize;
        var forceRemote = false;
        var doNotcareAboutPaging = false;
  	  
        var  repo = {
         
            getAllIMessages: function (expand, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getMessages(expand, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllFMessages: function (filterField, filterOperator,filtervalue) {
                doNotcareAboutPaging = true;
                return getMessages(null, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllMessages: function () {
                doNotcareAboutPaging = true;
                return getMessages(null, null , null , null, null, null);
            },
         
         
            getPagedMessages: function (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getMessages(expand, currentPage, pageSize, filterField, filterOperator, filtervalue);
            },
         
         
            getMessageById: function (id) {
            return uow.getById('Message', id); 
            },
         
            createMessage: function (message) {
            return EntityManager.createEntity('Message', { DateOfPost : message.DateOfPost, MessageText : message.MessageText, CanDelete : message.CanDelete, Id : message.Id });
            },
          deleteMessage: function (message) {
            return message.entityAspect.setDeleted();
            },
         
        };
  	  
        return repo;
  	  
  	  
        function getMessages (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
  	  
            var select = ['MessageId, DateOfPost, MessageText, CanDelete'];
            //var expand = null; // No related Entities ; // tells the uow to retrieve these children entities values as well if case you need to
            var orderby = 'MessageText';
            var entity = 'Message';
            var resource = 'GetMessages';
  	  
                if (messageLastPageSize && messageLastPageSize != pageSize) {
                    forceRemote = true;
                } else if (messageLastCurrentpage && messageLastCurrentpage != currentPage) {
                    forceRemote = true;
                }
                else if ((!messageLastPageSize || !messageLastCurrentpage) && !doNotcareAboutPaging) {
                    forceRemote = true;
                }
                else {
                    forceRemote = false;
                }
  	  
                messageLastPageSize = pageSize;
                messageLastCurrentpage = currentPage;
                doNotcareAboutPaging = false;
    
              return uow.httpGet(forceRemote, entity, resource, orderby, select, expand, currentPage, pageSize, filterField, filterOperator, filtervalue).then(function (data) {
                    if (data && data.fromCache) {
                        data.totalRecords = messageInlineCount;
                        return mapBreezeToJsonInternal(data);
                    } else {
                        messageInlineCount = data.totalRecords;
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
                   return { 'MessageId' : result.MessageId, 'DateOfPost2' : result.DateOfPost2, 'MessageText' : result.MessageText, 'CanDelete' : result.CanDelete, 'Id' : result.Id };
                 });
            return {
                jsonResults: mapped,
                entityResults: data.entityResults,
                totalRecords: messageInlineCount,
                fromCache: data.fromCache
            };
        }
  	  
  	  
  	  
    }
})();
