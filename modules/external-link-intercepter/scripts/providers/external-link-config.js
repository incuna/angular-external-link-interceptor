(function (angular) {
    'use strict';

    var module = angular.module('angular-external-link-interceptor.external-link-config', []);

    module.provider('externalLinkConfig', function () {
        var closeModalOnSuccess = false;

        return {
            $get: function () {
                return {
                    closeModalOnSuccess: closeModalOnSuccess
                };
            },
            setCloseModalOnSuccess: function (value) {
                closeModalOnSuccess = value;
            }
        };
    });

}(window.angular));
