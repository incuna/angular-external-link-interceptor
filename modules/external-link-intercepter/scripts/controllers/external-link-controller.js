(function (angular) {
    'use strict';

    var module = angular.module('angular-external-link-interceptor.controller', []);

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

}(window.angular));
