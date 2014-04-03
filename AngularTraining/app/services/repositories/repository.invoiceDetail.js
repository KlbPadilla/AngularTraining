(function () {
    'use strict';
    var serviceId = 'repository.invoiceDetail';
    angular.module('app').factory(serviceId, ['uow', 'lowdash', repositoryInvoiceDetail]);
        /*********************************************************
        * This factory could be refactored into a generic service  
        * Then have it create (by injection) on demand
        * to form this repository, as done in the dataservice.
        * But consider that a real life application will eventually need 
        * a place to put the Business Logic for each entity. And this is it.
        *********************************************************/
    function repositoryInvoiceDetail(uow, _) {
  	  
        var invoiceDetailInlineCount;
        var invoiceDetailLastCurrentpage;
        var invoiceDetailLastPageSize;
        var forceRemote = false;
        var doNotcareAboutPaging = false;
  	  
        var  repo = {
         
            getAllIInvoiceDetails: function (expand, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getInvoiceDetails(expand, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllFInvoiceDetails: function (filterField, filterOperator,filtervalue) {
                doNotcareAboutPaging = true;
                return getInvoiceDetails(null, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllInvoiceDetails: function () {
                doNotcareAboutPaging = true;
                return getInvoiceDetails(null, null , null , null, null, null);
            },
         
         
            getPagedInvoiceDetails: function (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getInvoiceDetails(expand, currentPage, pageSize, filterField, filterOperator, filtervalue);
            },
         
         
            getInvoiceDetailById: function (id) {
            return uow.getById('InvoiceDetail', id); 
            },
         
            createInvoiceDetail: function (invoiceDetail) {
            return EntityManager.createEntity('InvoiceDetail', { Qty : invoiceDetail.Qty, PriceWithDiscount : invoiceDetail.PriceWithDiscount, LineTax : invoiceDetail.LineTax, LineCommission : invoiceDetail.LineCommission, LineTotal : invoiceDetail.LineTotal, InvoiceId : invoiceDetail.InvoiceId, ProductId : invoiceDetail.ProductId });
            },
          deleteInvoiceDetail: function (invoiceDetail) {
            return invoiceDetail.entityAspect.setDeleted();
            },
         
        };
  	  
        return repo;
  	  
  	  
        function getInvoiceDetails (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
  	  
            var select = ['InvoiceDetailId, InvoiceId, ProductId'];
            //var expand = null; // No related Entities ; // tells the uow to retrieve these children entities values as well if case you need to
            var orderby = 'Qty';
            var entity = 'InvoiceDetail';
            var resource = 'GetInvoiceDetails';
  	  
                if (invoiceDetailLastPageSize && invoiceDetailLastPageSize != pageSize) {
                    forceRemote = true;
                } else if (invoiceDetailLastCurrentpage && invoiceDetailLastCurrentpage != currentPage) {
                    forceRemote = true;
                }
                else if ((!invoiceDetailLastPageSize || !invoiceDetailLastCurrentpage) && !doNotcareAboutPaging) {
                    forceRemote = true;
                }
                else {
                    forceRemote = false;
                }
  	  
                invoiceDetailLastPageSize = pageSize;
                invoiceDetailLastCurrentpage = currentPage;
                doNotcareAboutPaging = false;
    
              return uow.httpGet(forceRemote, entity, resource, orderby, select, expand, currentPage, pageSize, filterField, filterOperator, filtervalue).then(function (data) {
                    if (data && data.fromCache) {
                        data.totalRecords = invoiceDetailInlineCount;
                        return mapBreezeToJsonInternal(data);
                    } else {
                        invoiceDetailInlineCount = data.totalRecords;
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
                   return { 'InvoiceDetailId' : result.InvoiceDetailId, 'Qty' : result.Qty, 'PriceWithDiscount' : result.PriceWithDiscount, 'LineTax' : result.LineTax, 'LineCommission' : result.LineCommission, 'LineTotal' : result.LineTotal, 'InvoiceId' : result.InvoiceId, 'ProductId' : result.ProductId };
                 });
            return {
                jsonResults: mapped,
                entityResults: data.entityResults,
                totalRecords: invoiceDetailInlineCount,
                fromCache: data.fromCache
            };
        }
  	  
  	  
  	  
    }
})();
