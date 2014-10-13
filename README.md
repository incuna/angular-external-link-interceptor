# Angular External Link Interceptor

Intercepts all external links on a page with a ui-bootstrap modal.

### Installation

* Load `angular-route` and `ui-bootstrap` scripts in to your HTML.
* Load the main script file in to your HTML.
* Add the `externalLinkInterceptor` module to your main app modules dependecies.
* Optionally override the default `templates/external_link/page.html` and `templates/external_link/message.html` templates.

### Usage

By default all links will be intercepted, however it is possible to whitelist specific links with an `allow-external` attribute.
