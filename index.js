/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ivy-videojs',

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  included: function(app) {
    app.import({
      development: path.join(app.bowerDirectory, 'video.js/dist/video-js/video-js.css'),
      production:  path.join(app.bowerDirectory, 'video.js/dist/video-js/video-js.min.css')
    });

    app.import('vendor/ivy-videojs/shims.js', {
      exports: {
        videojs: ['default']
      }
    });

    app.import({
      development: path.join(app.bowerDirectory, 'video.js/dist/video-js/video.dev.js'),
      production:  path.join(app.bowerDirectory, 'video.js/dist/video-js/video.js')
    });

    app.import(path.join(app.bowerDirectory, 'video.js/dist/video-js/video-js.swf'));
  }
};
