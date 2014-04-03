(function () {
    'use strict';
    var serviceId = 'repository.productCategory';
    angular.module('app').factory(serviceId, ['uow', 'lowdash', repositoryProductCategory]);
        /*********************************************************
        * This factory could be refactored into a generic service  
        * Then have it create (by injection) on demand
        * to form this repository, as done in the dataservice.
        * But consider that a real life application will eventually need 
        * a place to put the Business Logic for each entity. And this is it.
        *********************************************************/
    function repositoryProductCategory(uow, _) {
  	  
        var productCategoryInlineCount;
        var productCategoryLastCurrentpage;
        var productCategoryLastPageSize;
        var forceRemote = false;
        var doNotcareAboutPaging = false;
  	  
        var  repo = {
         
            getAllIProductCategories: function (expand, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getProductCategories(expand, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllFProductCategories: function (filterField, filterOperator,filtervalue) {
                doNotcareAboutPaging = true;
                return getProductCategories(null, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllProductCategories: function () {
                doNotcareAboutPaging = true;
                return getProductCategories(null, null , null , null, null, null);
            },
         
         
            getPagedProductCategories: function (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getProductCategories(expand, currentPage, pageSize, filterField, filterOperator, filtervalue);
            },
         
         
            getProductCategoryById: function (id) {
            return uow.getById('ProductCategory', id); 
            },
         
            createProductCategory: function (productCategory) {
            return EntityManager.createEntity('ProductCategory', { Category : productCategory.Category });
            },
          deleteProductCategory: function (productCategory) {
            return productCategory.entityAspect.setDeleted();
            },
         
        };
  	  
        return repo;
  	  
  	  
        function getProductCategories (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
  	  
            var select = ['ProductCategoryId, Category'];
            //var expand = ['Products'] ; // tells the uow to retrieve these children entities values as well if case you need to
            var orderby = 'ProductCategoryId';
            var entity = 'ProductCategory';
            var resource = 'GetProductCategories';
  	  
                if (productCategoryLastPageSize && productCategoryLastPageSize != pageSize) {
                    forceRemote = true;
                } else if (productCategoryLastCurrentpage && productCategoryLastCurrentpage != currentPage) {
                    forceRemote = true;
                }
                else if ((!productCategoryLastPageSize || !productCategoryLastCurrentpage) && !doNotcareAboutPaging) {
                    forceRemote = true;
                }
                else {
                    forceRemote = false;
                }
  	  
                productCategoryLastPageSize = pageSize;
                productCategoryLastCurrentpage = currentPage;
                doNotcareAboutPaging = false;
    
              return uow.httpGet(forceRemote, entity, resource, orderby, select, expand, currentPage, pageSize, filterField, filterOperator, filtervalue).then(function (data) {
                    if (data && data.fromCache) {
                        data.totalRecords = productCategoryInlineCount;
                        return mapBreezeToJsonInternal(data);
                    } else {
                        productCategoryInlineCount = data.totalRecords;
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
                   return { 'ProductCategoryId' : result.ProductCategoryId, 'Category' : result.Category, 'Products' : result.Products };
                 });
            return {
                jsonResults: mapped,
                entityResults: data.entityResults,
                totalRecords: productCategoryInlineCount,
                fromCache: data.fromCache
            };
        }
  	  
  	  
  	  
    }
})();
