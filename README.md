# Angular External Link Interceptor

Intercepts all external links on a page with a ui-bootstrap modal.

### Installation

* Load `angular-route` and `ui-bootstrap` scripts in to your HTML.
* Load the main script file in to your HTML.
* Add the `externalLinkInterceptor` module to your main app modules dependecies.
* Optionally override the default `templates/external_link/page.html` and `templates/external_link/message.html` templates.

### Usage

By default all links will be intercepted, however it is possible to whitelist specific links with an `allow-external` attribute.

## Releasing a new version

1. Commit your changes.
1. Run `grunt build` to generate the compiled template files
1. Follow the guidelines at http://semver.org/ to determine your new version number.
1. Update `CHANGELOG.md` with your new [version number] and a description of changes. [version number] should be in the format x.y.z.
1. Update the `version` property in `package.json`
1. Commit those changes with the commit message "Bump to [version number]".
1. `git tag [version number]`
1. `git push`
1. `git push --tags` - must be done separately.
