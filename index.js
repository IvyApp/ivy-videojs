'use strict';

const path = require('path');

module.exports = {
  name: require('./package').name,

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  included: function(app) {
    if (!process.env.EMBER_CLI_FASTBOOT) {
      var options = app.options.videojs || {};

      app.import({
        development: 'node_modules/video.js/dist/video-js.css',
        production:  'node_modules/video.js/dist/video-js.min.css'
      });

      app.import('node_modules/video.js/dist/font/VideoJS.eot', { destDir: 'assets/font' });
      app.import('node_modules/video.js/dist/font/VideoJS.svg', { destDir: 'assets/font' });
      app.import('node_modules/video.js/dist/font/VideoJS.ttf', { destDir: 'assets/font' });
      app.import('node_modules/video.js/dist/font/VideoJS.woff', { destDir: 'assets/font' });

      app.import('vendor/ivy-videojs/shims.js', {
        exports: {
          videojs: ['default']
        }
      });

      app.import({
        development: 'node_modules/video.js/dist/video.js',
        production:  'node_modules/video.js/dist/video.min.js'
      });

      (options.languages || []).forEach(function(language) {
        app.import('node_modules/video.js/dist/lang/' + language + '.js');
      });

      app.import('node_modules/video.js/dist/video-js.swf', { destDir: 'assets' });
    }
  }
};
