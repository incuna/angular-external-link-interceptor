(function (angular) {
    'use strict';

    var module = angular.module('angular-external-link-interceptor.external-link-service', [
        'ngRoute',
        'ui.bootstrap.modal'
    ]);

    module.service('ExternalLinkService', [
        '$filter', '$location', '$uibModal',
        function ($filter, $location, $uibModal) {

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

                    // Because the model is opened later the currentTarget mey get set to null.
                    var currentTarget = e.currentTarget;

                    // Open a bootstrap-ui modal.
                    $uibModal.open({
                        templateUrl: 'templates/external_link/message.html',
                        resolve: {
                            externalUrl: function () {
                                return href;
                            }
                        },
                        controller: [
                            '$scope', '$uibModalInstance', 'externalUrl', 'externalLinkConfig',
                            function ($scope, $uibModalInstance, externalUrl, externalLinkConfig) {
                                $scope.externalUrl = externalUrl;

                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                };
                                $scope.closeOnSuccess = function () {
                                    if (externalLinkConfig.closeModalOnSuccess) {
                                        $uibModalInstance.dismiss('close');
                                    }
                                };

                                // Pass through target attribute, so links that
                                // should open in a new window can.
                                var element = angular.element(currentTarget);
                                $scope.target = element.attr('target');
                            }
                        ]
                    });
                },
                bindModal: function (element, newValue, previousClickFunction) {
                    // The click event may have been bound based on a
                    // previous href value.
                    element.off('click',  previousClickFunction);
                    var clickFunction = function (e) {
                        ExternalLinkService.externalModal(e, newValue);
                    };
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
                    return clickFunction;
                }
            };

            return ExternalLinkService;
        }
    ]);

}(window.angular));
