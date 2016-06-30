(function (angular) {
    'use strict';

    var module = angular.module('angular-external-link-interceptor.routes', [
        'ngRoute'
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

}(window.angular));
