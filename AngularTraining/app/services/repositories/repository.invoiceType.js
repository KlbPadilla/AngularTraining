(function () {
    'use strict';
    var serviceId = 'repository.invoiceType';
    angular.module('app').factory(serviceId, ['uow', 'lowdash', repositoryInvoiceType]);
        /*********************************************************
        * This factory could be refactored into a generic service  
        * Then have it create (by injection) on demand
        * to form this repository, as done in the dataservice.
        * But consider that a real life application will eventually need 
        * a place to put the Business Logic for each entity. And this is it.
        *********************************************************/
    function repositoryInvoiceType(uow, _) {
  	  
        var invoiceTypeInlineCount;
        var invoiceTypeLastCurrentpage;
        var invoiceTypeLastPageSize;
        var forceRemote = false;
        var doNotcareAboutPaging = false;
  	  
        var  repo = {
         
            getAllIInvoiceTypes: function (expand, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getInvoiceTypes(expand, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllFInvoiceTypes: function (filterField, filterOperator,filtervalue) {
                doNotcareAboutPaging = true;
                return getInvoiceTypes(null, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllInvoiceTypes: function () {
                doNotcareAboutPaging = true;
                return getInvoiceTypes(null, null , null , null, null, null);
            },
         
         
            getPagedInvoiceTypes: function (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getInvoiceTypes(expand, currentPage, pageSize, filterField, filterOperator, filtervalue);
            },
         
         
            getInvoiceTypeById: function (id) {
            return uow.getById('InvoiceType', id); 
            },
         
            createInvoiceType: function (invoiceType) {
            return EntityManager.createEntity('InvoiceType', { Type : invoiceType.Type });
            },
          deleteInvoiceType: function (invoiceType) {
            return invoiceType.entityAspect.setDeleted();
            },
         
        };
  	  
        return repo;
  	  
  	  
        function getInvoiceTypes (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
  	  
            var select = ['InvoiceTypeId, Type'];
            //var expand = ['Invoices'] ; // tells the uow to retrieve these children entities values as well if case you need to
            var orderby = 'Type';
            var entity = 'InvoiceType';
            var resource = 'GetInvoiceTypes';
  	  
                if (invoiceTypeLastPageSize && invoiceTypeLastPageSize != pageSize) {
                    forceRemote = true;
                } else if (invoiceTypeLastCurrentpage && invoiceTypeLastCurrentpage != currentPage) {
                    forceRemote = true;
                }
                else if ((!invoiceTypeLastPageSize || !invoiceTypeLastCurrentpage) && !doNotcareAboutPaging) {
                    forceRemote = true;
                }
                else {
                    forceRemote = false;
                }
  	  
                invoiceTypeLastPageSize = pageSize;
                invoiceTypeLastCurrentpage = currentPage;
                doNotcareAboutPaging = false;
    
              return uow.httpGet(forceRemote, entity, resource, orderby, select, expand, currentPage, pageSize, filterField, filterOperator, filtervalue).then(function (data) {
                    if (data && data.fromCache) {
                        data.totalRecords = invoiceTypeInlineCount;
                        return mapBreezeToJsonInternal(data);
                    } else {
                        invoiceTypeInlineCount = data.totalRecords;
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
                   return { 'InvoiceTypeId' : result.InvoiceTypeId, 'Type' : result.Type, 'Invoices' : result.Invoices };
                 });
            return {
                jsonResults: mapped,
                entityResults: data.entityResults,
                totalRecords: invoiceTypeInlineCount,
                fromCache: data.fromCache
            };
        }
  	  
  	  
  	  
    }
})();
