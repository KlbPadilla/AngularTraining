(function () {
    'use strict';
    var serviceId = 'repository.invoice';
    angular.module('app').factory(serviceId, ['uow', 'lowdash', repositoryInvoice]);
        /*********************************************************
        * This factory could be refactored into a generic service  
        * Then have it create (by injection) on demand
        * to form this repository, as done in the dataservice.
        * But consider that a real life application will eventually need 
        * a place to put the Business Logic for each entity. And this is it.
        *********************************************************/
    function repositoryInvoice(uow, _) {
  	  
        var invoiceInlineCount;
        var invoiceLastCurrentpage;
        var invoiceLastPageSize;
        var forceRemote = false;
        var doNotcareAboutPaging = false;
  	  
        var  repo = {
         
            getAllIInvoices: function (expand, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getInvoices(expand, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllFInvoices: function (filterField, filterOperator,filtervalue) {
                doNotcareAboutPaging = true;
                return getInvoices(null, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllInvoices: function () {
                doNotcareAboutPaging = true;
                return getInvoices(null, null , null , null, null, null);
            },
         
         
            getPagedInvoices: function (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getInvoices(expand, currentPage, pageSize, filterField, filterOperator, filtervalue);
            },
         
         
            getInvoiceById: function (id) {
            return uow.getById('Invoice', id); 
            },
         
            createInvoice: function (invoice) {
            return EntityManager.createEntity('Invoice', { DateOfSale : invoice.DateOfSale, DueDate : invoice.DueDate, ShipDate : invoice.ShipDate, PrintDocNumber : invoice.PrintDocNumber, ShipMethod : invoice.ShipMethod, SubTotal : invoice.SubTotal, TaxAmt : invoice.TaxAmt, Freight : invoice.Freight, TotalDue : invoice.TotalDue, Comment : invoice.Comment, ModifiedDate : invoice.ModifiedDate, Image : invoice.Image, CustomerId : invoice.CustomerId, EmployeeId : invoice.EmployeeId, InvoiceTypeId : invoice.InvoiceTypeId });
            },
          deleteInvoice: function (invoice) {
            return invoice.entityAspect.setDeleted();
            },
         
        };
  	  
        return repo;
  	  
  	  
        function getInvoices (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
  	  
            var select = ['InvoiceId, CustomerId, EmployeeId, InvoiceTypeId, DateOfSale, DueDate, ShipDate, PrintDocNumber, ShipMethod, ModifiedDate'];
            //var expand = ['InvoiceDetails'] ; // tells the uow to retrieve these children entities values as well if case you need to
            var orderby = 'PrintDocNumber';
            var entity = 'Invoice';
            var resource = 'GetInvoices';
  	  
                if (invoiceLastPageSize && invoiceLastPageSize != pageSize) {
                    forceRemote = true;
                } else if (invoiceLastCurrentpage && invoiceLastCurrentpage != currentPage) {
                    forceRemote = true;
                }
                else if ((!invoiceLastPageSize || !invoiceLastCurrentpage) && !doNotcareAboutPaging) {
                    forceRemote = true;
                }
                else {
                    forceRemote = false;
                }
  	  
                invoiceLastPageSize = pageSize;
                invoiceLastCurrentpage = currentPage;
                doNotcareAboutPaging = false;
    
              return uow.httpGet(forceRemote, entity, resource, orderby, select, expand, currentPage, pageSize, filterField, filterOperator, filtervalue).then(function (data) {
                    if (data && data.fromCache) {
                        data.totalRecords = invoiceInlineCount;
                        return mapBreezeToJsonInternal(data);
                    } else {
                        invoiceInlineCount = data.totalRecords;
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
                   return { 'InvoiceId' : result.InvoiceId, 'DateOfSale2' : result.DateOfSale2, 'DueDate2' : result.DueDate2, 'ShipDate2' : result.ShipDate2, 'PrintDocNumber' : result.PrintDocNumber, 'ShipMethod' : result.ShipMethod, 'SubTotal' : result.SubTotal, 'TaxAmt' : result.TaxAmt, 'Freight' : result.Freight, 'TotalDue' : result.TotalDue, 'Comment' : result.Comment, 'ModifiedDate2' : result.ModifiedDate2, 'Image' : result.Image, 'CustomerId' : result.CustomerId, 'EmployeeId' : result.EmployeeId, 'InvoiceTypeId' : result.InvoiceTypeId, 'InvoiceDetails' : result.InvoiceDetails };
                 });
            return {
                jsonResults: mapped,
                entityResults: data.entityResults,
                totalRecords: invoiceInlineCount,
                fromCache: data.fromCache
            };
        }
  	  
  	  
  	  
    }
})();
