(function () {
    'use strict';
    var serviceId = 'repository.employee';
    angular.module('app').factory(serviceId, ['uow', 'lowdash', repositoryEmployee]);
        /*********************************************************
        * This factory could be refactored into a generic service  
        * Then have it create (by injection) on demand
        * to form this repository, as done in the dataservice.
        * But consider that a real life application will eventually need 
        * a place to put the Business Logic for each entity. And this is it.
        *********************************************************/
    function repositoryEmployee(uow, _) {
  	  
        var employeeInlineCount;
        var employeeLastCurrentpage;
        var employeeLastPageSize;
        var forceRemote = false;
        var doNotcareAboutPaging = false;
  	  
        var  repo = {
         
            getAllIEmployees: function (expand, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getEmployees(expand, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllFEmployees: function (filterField, filterOperator,filtervalue) {
                doNotcareAboutPaging = true;
                return getEmployees(null, null , null , filterField, filterOperator, filtervalue);
            },
         
         
            getAllEmployees: function () {
                doNotcareAboutPaging = true;
                return getEmployees(null, null , null , null, null, null);
            },
         
         
            getPagedEmployees: function (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
                doNotcareAboutPaging = true;
                return getEmployees(expand, currentPage, pageSize, filterField, filterOperator, filtervalue);
            },
         
         
            getEmployeeById: function (id) {
            return uow.getById('Employee', id); 
            },
         
            createEmployee: function (employee) {
            return EntityManager.createEntity('Employee', { FirstName : employee.FirstName, LastName : employee.LastName, DateOfBirth : employee.DateOfBirth, Salary : employee.Salary, Photo : employee.Photo, PositionHeld : employee.PositionHeld });
            },
          deleteEmployee: function (employee) {
            return employee.entityAspect.setDeleted();
            },
         
        };
  	  
        return repo;
  	  
  	  
        function getEmployees (expand, currentPage, pageSize, filterField, filterOperator, filtervalue) {
  	  
            var select = ['EmployeeId, FirstName, LastName, DateOfBirth, PositionHeld'];
            //var expand = ['Invoices'] ; // tells the uow to retrieve these children entities values as well if case you need to
            var orderby = 'FirstName';
            var entity = 'Employee';
            var resource = 'GetEmployees';
  	  
                if (employeeLastPageSize && employeeLastPageSize != pageSize) {
                    forceRemote = true;
                } else if (employeeLastCurrentpage && employeeLastCurrentpage != currentPage) {
                    forceRemote = true;
                }
                else if ((!employeeLastPageSize || !employeeLastCurrentpage) && !doNotcareAboutPaging) {
                    forceRemote = true;
                }
                else {
                    forceRemote = false;
                }
  	  
                employeeLastPageSize = pageSize;
                employeeLastCurrentpage = currentPage;
                doNotcareAboutPaging = false;
    
              return uow.httpGet(forceRemote, entity, resource, orderby, select, expand, currentPage, pageSize, filterField, filterOperator, filtervalue).then(function (data) {
                    if (data && data.fromCache) {
                        data.totalRecords = employeeInlineCount;
                        return mapBreezeToJsonInternal(data);
                    } else {
                        employeeInlineCount = data.totalRecords;
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
                   return { 'EmployeeId' : result.EmployeeId, 'FirstName' : result.FirstName, 'LastName' : result.LastName, 'DateOfBirth2' : result.DateOfBirth2, 'Salary' : result.Salary, 'Photo' : result.Photo, 'PositionHeld' : result.PositionHeld, 'Invoices' : result.Invoices };
                 });
            return {
                jsonResults: mapped,
                entityResults: data.entityResults,
                totalRecords: employeeInlineCount,
                fromCache: data.fromCache
            };
        }
  	  
  	  
  	  
    }
})();
