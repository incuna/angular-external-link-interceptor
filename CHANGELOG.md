# CHANGELOG

# Upcoming

* BREAKING CHANGE: Move code to seperate files.
* Add build task to create a minified file and a concatenated file.
* Add file linting using eslint version 18.1.0. https://github.com/sindresorhus/grunt-eslint.
* Update readme with release instructions.

### 2.1.0

* Allow modal to close upon clicking "Continue" button based on an option.
* Create config provider to provide `closeModalOnSuccess` boolean for the above. _NB:_ requires update to `message.html` template in projects.

### 2.0.4

* Allow bootstrap to install up to anything bigger than or equal to 1.1.0 and less than 1.3

### 2.0.3

* Upgrade Angular compatibility to include 1.5.
* Upgrade Angular-route compatibility to include 1.5.
* Allow bootstrap to install any version less than 1.3

### 2.0.2

* BUGFIX: Stop bindModal function creating a new instance of the clickFunction.

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
