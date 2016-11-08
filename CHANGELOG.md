# ivy-videojs Changelog

## 0.6.4 (November 8, 2016)

  * Merge pull request #19 from IvyApp/ember-cli-2.9.1
  * Upgrade to Ember CLI 2.9.1

## 0.6.3 (May 31, 2016)

  * Merge pull request #15 from rtablada/feature/fastboot
  * Don't import on fastboot builds

## 0.6.2 (December 4, 2015)

  * Add a `setup` property for initial player setup.

## 0.6.1 (October 22, 2015)

  * Bind `language` property to the `ivy-videojs` component. See #10.

## 0.6.0 (October 21, 2015)

  * Upgrade ember-qunit to fix test failures on beta.
  * Add webm sources to tests.
  * Update README.
  * Add a simplified `ivy-videojs` which wraps `ivy-videojs-player`.
  * Trim off yet more fat from the component.
  * Rewrite the component to remove two-way bindings.
  * Add CHANGELOG.

## 0.5.0 (September 29, 2015)

  * Upgrade to video.js 5.0.0.
  * Upgrade to ember-cli 1.13.8.

## 0.4.6 (September 11, 2015)

  * Move TechFaker out of the addon's namespace.

## 0.4.5 (September 11, 2015)

  * Merge pull request #6 from pavloo/lock-videojs-version
  * lock videojs version in bower.json and in blueprint

## 0.4.4 (June 24, 2015)

  * Upgrade ember-qunit to 0.4.0 to fix test failures.
  * Remove deprecated Ember.EnumerableUtils usage.
  * Upgrade to ember-cli 0.2.7.
  * Add a 250ms fudge factor to currentTime tests.
  * Clarify the status of Flash in the README.

## 0.4.3 (June 1, 2015)

  * Fix an issue with autoresize setting properties after destruction.

## 0.4.2 (June 1, 2015)

  * Add a note to the README about Flash not working.
  * Import the Flash player SWF into /assets.
  * Upgrade to ember-cli 0.2.6.
  * Bump videojs dependency to 5.0.0-29.
  * Parameterize the test suite by player technology.
  * Don't listen for `loadedmetadata` or `play` in timeupdate tests.
  * Simplify some of the runloop-related code.
  * Force the tech to load in tests.
  * Silence content-security-policy warnings about inline styles.
  * Rename unit test to integration.

## 0.4.1 (May 27, 2015)

  * Upgrade to ember-cli 0.2.5.
  * Add a fake video.js tech so tests will run under PhantomJS.
  * Use unminified video.js builds in development mode.
  * Set up event listeners synchronously (outside of a runloop).
  * Revert "Basic standalone builds. Not automated at the moment."
  * Basic standalone builds. Not automated at the moment.

## 0.4.0 (May 26, 2015)

  * Make sure autoresize tests wait until `afterRender`.
  * Wrap `_didInitPlayer` in a runloop.
  * Remove "if (property in this)" check. See #3.
  * Bump videojs to 5.0.0-21.
  * Switch to integration component tests. Change "ready" to an action.
  * Use re-export syntax in app files.
  * Fix failing autoresize test.
  * Upgrade to ember-cli 0.2.4.

## 0.3.1 (May 7, 2015)

  * Set player dimensions directly rather than through properties.
  * Alphabetize methods.

## 0.3.0 (May 7, 2015)

  * Add `autoresize` feature, making videos responsive.
  * Silence Content-Security-Policy warnings in dummy app.
  * Cut down on the number of notification emails from Travis.

## 0.2.2 (May 7, 2015)

  * Constrain video.js version to ~5.0.0-11.

## 0.2.1 (May 7, 2015)

  * Merge pull request #2 from inDream/master
  * Keep "muted" property in sync with player's "muted" property.
  * Update video.js to 5.0.0
  * Merge pull request #1 from inDream/master
  * Fix README.md

## 0.2.0 (April 13, 2015)

  * Upgrade to ember-cli 0.2.3.
  * Rewrite `ivy-videojs` to ease binding properties & events.
  * Use notifyPropertyChange instead of calling the observer directly.

## 0.1.1 (April 6, 2015)

  * No code changes, this version was only released to cause npmjs.com to pick up changes.

## 0.1.0 (April 6, 2015)

  * Initial release.
