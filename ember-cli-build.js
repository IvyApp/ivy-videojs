/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-addon');
var path = require('path');
var Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    videojs: {
      languages: ['es']
    }
  });

  /*
    This build file specifes the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  app.import(path.join(app.bowerDirectory, 'ember/ember-template-compiler.js'), {
    type: 'test'
  });

  var bootstrapTree = new Funnel(path.join(app.bowerDirectory, 'bootstrap/dist/css'), {
    srcDir: '/',
    destDir: '/assets'
  });

  var fixturesTree = new Funnel(path.join(__dirname, 'tests/fixtures'), {
    srcDir: '/',
    destDir: '/assets'
  });

  return app.toTree([bootstrapTree, fixturesTree]);
};
