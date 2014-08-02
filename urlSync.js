(function () {
    'use strict';

    angular.module('UrlSync', [])
        .directive('urlSync', ['$location', '$filter', function ($location, $filter)
    {
        var definition = {
            restrict: 'A',
            scope: { ngModel: '=', name: '@', type: '@' },
            link: function (scope, iElement, iAttrs)
            {

                var dateValue = $location.search()[scope.name];
                var parsedValue = null;

                if (scope.type == 'date') {
                    var date = moment(dateValue);
                    if(date.isValid())
                    {
                        parsedValue = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
                    }
                }
                else {
                    parsedValue = dateValue;
                }

                if(parsedValue)
                {
                    scope.ngModel = parsedValue;
                }

                scope.$watch('ngModel', function (newValue, oldValue) {

                    if (newValue && oldValue) {
                        if (scope.type == date && newValue instanceof Date) {
                            var date = $filter('date')(newValue, 'yyyy-MM-dd');
                            $location.search(scope.name, date);
                        }
                        else
                            $location.search(scope.name, newValue);
                    }

                });
            }
        };
        return definition;
    }]);
})();
