(function () {
    'use strict';
    var app = angular.module('app');


    app.directive('ccScrollToTop', ['$window',
    // Usage:
    // <span data-cc-scroll-to-top></span>
    // Creates:
    // <span data-cc-scroll-to-top="" class="totop">
    // <a href="#"><i class="icon-chevron-up"></i></a>
    // </span>
    function ($window) {
        var directive = {
            link: link,
            template: '<a href="#"><i class="fa fa-chevron-up"></i></a>',
            restrict: 'A'
        };
        return directive;
        function link(scope, element, attrs) {
            var $win = $($window);
            element.addClass('totop');
            $win.scroll(toggleIcon);
            element.find('a').click(function (e) {
                e.preventDefault();
                // Learning Point: $anchorScroll works, but no animation
                //$anchorScroll();
                $('body').animate({ scrollTop: 0 }, 500);
            });
            function toggleIcon() {
                $win.scrollTop() > 300 ? element.slideDown() : element.slideUp();
            }
        }
    }
    ]);


    app.directive('ccSpinner', ['$window', function ($window) {
        // Description:
        // Creates a new Spinner and sets its options
        // Usage:
        // <div data-cc-spinner="vm.spinnerOptions"></div>
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;
        function link(scope, element, attrs) {
            scope.spinner = null;
            scope.$watch(attrs.ccSpinner, function (options) {
                if (scope.spinner) {
                    scope.spinner.stop();
                }
                scope.spinner = new $window.Spinner(options);
                scope.spinner.spin(element[0]);
            }, true);
        }
    }]);


    app.directive('ccWip', ['$route', function ($route) {
        //Usage:
        //<li data-cc-wip
        // wip="vm.wip"
        // routes="vm.routes"
        // changed-event="{{vm.wipChangedEvent}}"
        // class="nlightblue"></li>
        var wipRouteName = 'workinprogress';
        var directive = {
            controller: ['$scope', wipController],
            link: link,
            template: getTemplate(),
            scope: {
                'wip': '=',
                'changedEvent': '@',
                'routes': '='
            },
            restrict: 'A'
        };
        return directive;
        function link(scope, element, attrs) {
            scope.$watch(wipIsCurrent, function (value) {
                value ? element.addClass('current') : element.removeClass('current');
            });
            function wipIsCurrent() {
                if (!$route.current || !$route.current.title) {
                    return false;
                }
                return $route.current.title.substr(0, wipRouteName.length) === wipRouteName;
            }
        }
        function wipController($scope) {
            $scope.wipExists = function () { return !!$scope.wip.length; };
            $scope.wipRoute = undefined;
            $scope.getWipClass = function () {
                return $scope.wipExists() ? 'fa fa-asterisk-alert' : '';
            };
            activate();
            function activate() {
                var eventName = $scope.changedEvent;
                $scope.$on(eventName, function (event, data) {
                    $scope.wip = data.wip;
                });
                $scope.wipRoute = $scope.routes.filter(function (r) {
                    return r.config.title === wipRouteName;
                })[0];
            }
        }
        function getTemplate() {
            return '<a href="#{{wipRoute.url}}" >'
            + '<i class="fa fa-asterisk" data-ng-class="getWipClass()"></i>'
            + 'Work in Progress ({{wip.length}})</a>';
        }
    }]);



})();