angular.module('angular-external-link-intercepter.templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/external_link/message.html',
    "<p>You are now leaving this website.</p><div><a ng-click=closeOnSuccess() ng-href=\"{{ externalUrl }}\" target=\"{{ target }}\" allow-external=true>Continue</a> <span ng-click=cancel()>Cancel</span></div>"
  );


  $templateCache.put('templates/external_link/page.html',
    "<div ng-include src=\"'templates/external_link/page.html'\"></div>"
  );

}]);
