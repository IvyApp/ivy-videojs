/* global define, require, window */
var addonName = 'ivy-videojs';

define('ember', ['exports'], function(__exports__) {
  __exports__['default'] = window.Ember;
});

define('videojs', ['exports'], function(__exports__) {
  __exports__['default'] = window.videojs;
});

var index = addonName + '/index';
define(addonName, ['exports'], function(__exports__) {
  var library = require(index);
  Object.keys(library).forEach(function(key) {
    __exports__[key] = library[key];
  });
});

// Glue library to a global var
window.IvyVideojs = require(index);

// Register library items in the container
var shim = addonName + '-shim';
window.Ember.Application.initializer({
  name: shim,

  initialize: function(container) {
    require(shim)['default'](container);
  }
});
