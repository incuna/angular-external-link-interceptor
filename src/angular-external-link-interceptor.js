(function (angular) {
    'use strict';

    var module = angular.module('externalLinkInterceptor', [
        'ngRoute',
        'ui.bootstrap'
    ]);

    module.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/external-link/', {
                    templateUrl: 'templates/external_link/page.html',
                    controller: 'ExternalLinkCtrl'
                });
        }
    ]);

    module.run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put('templates/external_link/message.html',
                '<p>You are now leaving this website.</p>' +
                '<div>' +
                    '<a ng-href="{{ externalUrl }}" target="{{ target }}" allow-external="true">Continue</a>' +
                    '<span ng-click="cancel()">Cancel</span>' +
                '</div>'
            );

            $templateCache.put('templates/external_link/page.html',
                '<div ng-include src="\'templates/external_link/page.html\'"></div>'
            );
        }
    ]);

    module.controller('ExternalLinkCtrl', [
        '$scope', '$location',
        function ($scope, $location) {
            $scope.externalUrl = $location.$$search.next;

            $scope.cancel = function () {
                if ($location.$$search.prev) {
                    $location.url($location.$$search.prev);
                } else {
                    $location.url('/');
                }
            };
        }
    ]);

    module.service('ExternalLinkService', [
        '$filter', '$location', '$modal',
        function ($filter, $location, $modal) {

            var ExternalLinkService = {
                externalLinkRE: new RegExp(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/),
                // External url testing function from http://stackoverflow.com/a/6238456
                isExternal: function (url) {
                    var match = url.match(ExternalLinkService.externalLinkRE);

                    if (typeof match[1] === 'string' && match[1].length > 0) {
                        if (match[1] === 'mailto:' || match[1] === 'tel:') {
                            return false;
                        }

                        if (match[1].toLowerCase() !== location.protocol) {
                            return true;
                        }
                    }

                    if (typeof match[2] === 'string' && match[2].length > 0 && match[2].replace(new RegExp(':(' + {
                        'http:': 80,
                        'https:': 443
                    }[location.protocol] + ')?$'), '') !== location.host) { return true; }
                    return false;
                },
                externalModal: function (e, href) {
                    e.preventDefault();

                    // Open a bootstrap-ui modal.
                    $modal.open({
                        templateUrl: 'templates/external_link/message.html',
                        resolve: {
                            externalUrl: function () {
                                return href;
                            }
                        },
                        controller: [
                            '$scope', '$modalInstance', 'externalUrl',
                            function ($scope, $modalInstance, externalUrl) {
                                $scope.externalUrl = externalUrl;

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };

                                // Pass through target attribute, so links that
                                // should open in a new window can.
                                var element = angular.element(e.currentTarget);
                                $scope.target = element.attr('target');
                            }
                        ]
                    });
                },
                bindModal: function (element, newValue) {
                    // The click event may have been bound based on a
                    // previous href value.
                    var clickFunction = function (e) {
                        ExternalLinkService.externalModal(e, newValue);
                    };
                    element.off('click', clickFunction);
                    if (newValue) {
                        // If the link is external.
                        if (ExternalLinkService.isExternal(newValue)) {
                            // Rewrite the url to go to the external link route.
                            // Adds a `next` parameter containing the external link and
                            // a `prev` parameter containing the current path, so that
                            // we can navigate back to where the user came from.
                            element.attr('href', $filter('reverseUrl')('ExternalLinkCtrl') + '?next=' + encodeURI(newValue) + '&prev=' + encodeURI($location.path()));

                            element.on('click', clickFunction);
                        }
                    }
                }
            };

            return ExternalLinkService;
        }
    ]);

    module.directive('a', [
        'ExternalLinkService',
        function (ExternalLinkService) {
            return {
                restrict: 'E',
                link: function (scope, element, attrs) {
                    // If the link does not have an attribute to allow it to by-pass the warning.
                    if (!attrs.allowExternal) {
                        attrs.$observe('href', function (newValue) {
                            ExternalLinkService.bindModal(element, newValue);
                        });
                    }
                }
            };
        }
    ]);

}(window.angular));
