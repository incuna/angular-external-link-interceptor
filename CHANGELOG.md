# CHANGELOG

### 2.1.0

* BUGFIX: Stop bindModal function creating a new instance of the clickFunction.
* Dismiss modal when choosing continue.

### 2.0.1

* Fix bootstrap syntax $modalInstance should be $uibModalInstance

### 2.0.0

* BREAKING CHANGE: Updating bootstrap to version 1.1.0 and angular to 1.4

### 1.2.3

* Fix currentTarget not having a value when used in the modal.

### 1.2.2

* Load only ui.bootstrap.modal instead of the whole module

## 1.2.1

* Include target attribute in template. Required for 1.2.0 to work without the project overriding the template.

## 1.2.0

* Pass through target attribute.

## 1.1.0

* Add a service and move some functions from the directive into that. This allows for much easier overrides in projects via decorators.

### 1.0.2

* External link interceptor now ignores tel: prefixed urls. 

### 1.0.1

* Link directive now does not use an isolate scope and watches the href attribute for changes rather than scope.

# 1.0.0

* Initial release
