/*jshint node:true*/
/* global require, module */
var path = require('path');
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    // Add options here
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  // TODO: Revise the tests to make this no longer necessary.
  app.import(path.join(app.bowerDirectory, 'ember/ember-template-compiler.js'), { type: 'test' });

  app.import({
    development: path.join(app.bowerDirectory, 'bootstrap/dist/css/bootstrap.css'),
    production:  path.join(app.bowerDirectory, 'bootstrap/dist/css/bootstrap.min.css')
  });
  app.import({
    development: path.join(app.bowerDirectory, 'bootstrap/dist/css/bootstrap.css.map'),
    production:  path.join(app.bowerDirectory, 'bootstrap/dist/css/bootstrap.min.css.map')
  });

  return app.toTree();
};
