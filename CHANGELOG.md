# CHANGELOG

# Upcoming

* Allow modal to close upon clicking "Continue" button based on an option.
* Create config provider to provide `closeModalOnSuccess` boolean for the above. _NB:_ requires update to `message.html` template in projects.

### 1.2.1

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
