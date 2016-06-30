(function (angular) {
    'use strict';

    var module = angular.module('angular-external-link-interceptor.a', []);

    module.directive('a', [
        'ExternalLinkService',
        function (ExternalLinkService) {
            return {
                restrict: 'E',
                link: function (scope, element, attrs) {
                    // Storing the current directives clickHandler so it can be properly unbound.
                    var clickHandler;

                    // If the link does not have an attribute to allow it to by-pass the warning.
                    if (!attrs.allowExternal) {
                        attrs.$observe('href', function (newValue) {
                            var newClickHandler = ExternalLinkService.bindModal(element, newValue, clickHandler);
                            clickHandler = newClickHandler;
                        });
                    }
                }
            };
        }
    ]);

}(window.angular));
