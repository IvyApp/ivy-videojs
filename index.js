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

    app.import(path.join(app.bowerDirectory, 'video.js/dist/video-js/font/vjs.eot'), { destDir: 'assets/font' });
    app.import(path.join(app.bowerDirectory, 'video.js/dist/video-js/font/vjs.svg'), { destDir: 'assets/font' });
    app.import(path.join(app.bowerDirectory, 'video.js/dist/video-js/font/vjs.ttf'), { destDir: 'assets/font' });
    app.import(path.join(app.bowerDirectory, 'video.js/dist/video-js/font/vjs.woff'), { destDir: 'assets/font' });

    app.import('vendor/ivy-videojs/shims.js', {
      exports: {
        videojs: ['default']
      }
    });

    app.import(path.join(app.bowerDirectory, 'video.js/dist/video-js/video.dev.js'));
    app.import(path.join(app.bowerDirectory, 'video.js/dist/video-js/video-js.swf'));
  }
};
