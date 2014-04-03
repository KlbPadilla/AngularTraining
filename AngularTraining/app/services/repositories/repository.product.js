(function () {
    'use strict';
    var serviceId = 'repository.product';
    angular.module('app').factory(serviceId, ['uow', 'lowdash', repositoryProduct]);
        /*********************************************************
        * This factory could be refactored into a generic service  
        * Then have it create (by injection) on demand
        * to form this repository, as done in the dataservice.
        * But consider that a real life application will eventually need 
        * a place to put the Business Logic for each entity. And this is it.
        *********************************************************/
    function repositoryProduct(uow, _) {
  	  
        var productInlineCount;
        var productLastCurrentpage;
        var productLastPageSize;
        var forceRemote = false;
        var doNotcareAboutPaging = false;
  	  
        var  repo = {
         
            getAllIProducts: function (expand, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getProducts(expand, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllFProducts: function (filterField, filterOperator,filtervalue) {
                doNotcareAboutPaging = true;
                return getProducts(null, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllProducts: function () {
                doNotcareAboutPaging = true;
                return getProducts(null, null , null , null, null, null);
            },
         
         
            getPagedProducts: function (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getProducts(expand, currentPage, pageSize, filterField, filterOperator, filtervalue);
            },
         
         
            getProductById: function (id) {
            return uow.getById('Product', id); 
            },
         
            createProduct: function (product) {
            return EntityManager.createEntity('Product', { Description : product.Description, LastDateOfSale : product.LastDateOfSale, Sku : product.Sku, SalePrice : product.SalePrice, CostPrice : product.CostPrice, Revenue : product.Revenue, Stock : product.Stock, Weight : product.Weight, CanBeSold : product.CanBeSold, Image : product.Image, ProductCategoryId : product.ProductCategoryId, Name : product.Name });
            },
          deleteProduct: function (product) {
            return product.entityAspect.setDeleted();
            },
         
        };
  	  
        return repo;
  	  
  	  
        function getProducts (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
  	  
            var select = ['ProductId, ProductCategoryId, Name, LastDateOfSale, Sku, Weight, CanBeSold'];
            //var expand = ['InvoiceDetails'] ; // tells the uow to retrieve these children entities values as well if case you need to
            var orderby = 'Name';
            var entity = 'Product';
            var resource = 'GetProducts';
  	  
                if (productLastPageSize && productLastPageSize != pageSize) {
                    forceRemote = true;
                } else if (productLastCurrentpage && productLastCurrentpage != currentPage) {
                    forceRemote = true;
                }
                else if ((!productLastPageSize || !productLastCurrentpage) && !doNotcareAboutPaging) {
                    forceRemote = true;
                }
                else {
                    forceRemote = false;
                }
  	  
                productLastPageSize = pageSize;
                productLastCurrentpage = currentPage;
                doNotcareAboutPaging = false;
    
              return uow.httpGet(forceRemote, entity, resource, orderby, select, expand, currentPage, pageSize, filterField, filterOperator, filtervalue).then(function (data) {
                    if (data && data.fromCache) {
                        data.totalRecords = productInlineCount;
                        return mapBreezeToJsonInternal(data);
                    } else {
                        productInlineCount = data.totalRecords;
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
                   return { 'ProductId' : result.ProductId, 'Description' : result.Description, 'LastDateOfSale2' : result.LastDateOfSale2, 'Sku' : result.Sku, 'SalePrice' : result.SalePrice, 'CostPrice' : result.CostPrice, 'Revenue' : result.Revenue, 'Stock' : result.Stock, 'Weight' : result.Weight, 'CanBeSold' : result.CanBeSold, 'Image' : result.Image, 'ProductCategoryId' : result.ProductCategoryId, 'Name' : result.Name, 'InvoiceDetails' : result.InvoiceDetails };
                 });
            return {
                jsonResults: mapped,
                entityResults: data.entityResults,
                totalRecords: productInlineCount,
                fromCache: data.fromCache
            };
        }
  	  
  	  
  	  
    }
})();
