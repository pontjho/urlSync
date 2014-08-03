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

                if (scope.type == 'date')
                {
                    var date = moment(dateValue, "YYYY-MM-DD");
                    if(date.isValid())
                    {
                        scope.ngModel = date.toDate();
                    }
                }
                else
                {
                    parsedValue = dateValue;
                }

                if(parsedValue)
                {
                    scope.ngModel = parsedValue;
                }

                scope.$watch('ngModel', function (newValue, oldValue)
                {
                    if (newValue)
                    {
                        if (scope.type == 'date')
                        {
                            if(newValue instanceof Date)
                            {
                                var date = $filter('date')(newValue, 'yyyy-MM-dd');
                                $location.search(scope.name, date);
                            }
                        }
                        else
                        {
                            $location.search(scope.name, newValue);
                        }
                    }

                });
            }
        };
        return definition;
    }]);
})();
