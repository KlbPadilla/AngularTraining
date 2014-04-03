(function () {
    'use strict';
    var serviceId = 'uow';
    angular.module('app').factory(serviceId, ['common', 'lowdash',  '$q', 'applicationData', uow]);
    function uow(common, _,  $q, applicationData) {
  
        var manager;
        var entityQuery;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn();
        var logError = getLogFn(serviceId, 'error');
        var service = {
            getById: getById,
            httpGet: httpGet,
            init: init
        };
        return service;
        // called exclusively by dataservice
        function init(mgr, qry) {
            manager = mgr;
            entityQuery = qry;
        };


        /*********************************************************
        * function summary
        * 
        * 
        * @ forceRemote: 
        * @ entity: 
        * @ resource: 
        * @ orderby: 
        * @ select: 
        * @ expand: 
        * @ pageIndex: 
        * @ pageSize: 
        * @ filterKey: 
        * @ filterOperator: 
        * @ filtervalue: 
        *
        * @returns: 
        *
        *********************************************************/
        function httpGet(forceRemote, entity, resource, orderby, select, expand, pageIndex, pageSize, filterKey, filterOperator, filtervalue) {
            var resultDataCached = null;
            var fromCache = false;
       

      
            //* if you are filtering a collection you already pulled from the server, then do it on the viewmodel , no need to get data again here.
            var predicate;
            var error = false;
            if (filterKey && filtervalue && filterOperator && filterKey.length > 0 && filtervalue.length > 0 && filterOperator.length > 0) {
                // predicate = new breeze.Predicate('LastName', "==", filtervalue, false);
                predicate = new breeze.Predicate(filterKey, filterOperator, filtervalue, false);
            } else {
                predicate = null;
            }
            if (applicationData.getDoWorkOffline()) {
                
            }
            var query = entityQuery.from(entity).orderBy(orderby).using(manager).skip(pageIndex * pageSize).take(pageSize).where(predicate).using(breeze.FetchStrategy.FromLocalCache).toType(entity).expand(expand);

            if (query) {
                try {
                    resultDataCached = manager.executeQueryLocally(query);
                } catch (e) {
                    error = true;
                    // eat it
                }
                if (resultDataCached && resultDataCached.length > 3 && !forceRemote && !error) {
                    fromCache = true;
                    return $q.when({
                        jsonResults: '',
                        entityResults: resultDataCached,
                        totalRecords: '',
                        fromCache: fromCache
                    });
                } else {
                    
                    
                    fromCache = false;
                    return entityQuery
                    .from(resource)
                    .using(manager)
                    //.withParameters({ start: start, end: end }) //* the controller expects these parameters
                    .where(predicate) // http://www.breezejs.com/documentation/query-examples
                    .toType(entity)
                    .expand(expand)
                    .skip(pageIndex * pageSize)
                    .take(pageSize)
                    .inlineCount(true)
                    .orderBy(orderby)
                   // .noTracking()  // http://www.breezejs.com/documentation/querying-depth
                    //.select(select) // check if calculated fields work when using select - include those fields on the select
                    .execute()
                    .then(querySucceededAll, queryFailed);
                }
            };
            function querySucceededAll(data) {
               
                //if (entity === 'Customer') {
                //    debugger;
                //}
                return {
                    jsonResults: data.httpResponse.data.Results,
                    entityResults: data.results,
                    totalRecords: parseInt(data.inlineCount),
                    fromCache: fromCache
                };
            }
        }


        function getById(resource, id) {
            //* the idea here, is as follow: it will check to see if the entity is already on the cache.
            // by putting the code is inside a Try, is to avoid the need to load all entities when the SPA initiates
            // on another matter, if there are errors retrieving data, remove the Try
            try {
                var entity = manager.getEntityByKey(resource, id);
            } catch (errorC) {
                // then get it from the remote server
                return entityQuery.from(resource + '/?id=' + id)
                .using(manager)
                .toType(resource)
                .execute()
                .then(querySucceeded, queryFailed);
            }
            return manager.fetchEntityByKey(resource, id, true)
            .then(function (fetchResult) {
                var s = fetchResult.entity;
                if (s) {
                    return $q.when(s); // got it; return it
                } else {
                    return entityQuery.from(resource + '/?id=' + id)
                    .using(manager)
                    .toType(resource)
                    .execute()
                    .then(querySucceeded, queryFailed);
                }
            });
            function querySucceeded(data) {
                return data.results[0];
            }
        }


        function getByCompositeIds(resource, id1, id2) {
          
            return entityQuery.from(resource)
            .using(manager)
            .where('entity1Id', 'eq', id1) //ex. .where('ProductId', 'eq', id1)
            .where('entity2Id', 'eq', id2) //ex. .where('InvoiceId', 'eq', id2)
            .toType(resource)
            .execute()
            .then(querySucceeded, queryFailed);
            function querySucceeded(data) {
                return data.results[0]; //note that return one not a collection of
            }
        }
        function queryFailed(error) {
            var msg = 'Error retrieveing data.' + error.message;
            logError(msg);
            throw error;
        }
    
    

    }
})();
