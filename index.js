/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ivy-videojs',

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  included: function(app) {
    var options = app.options.videojs || {};

    app.import({
      development: path.join(app.bowerDirectory, 'video.js/dist/video-js.css'),
      production:  path.join(app.bowerDirectory, 'video.js/dist/video-js.min.css')
    });

    app.import(path.join(app.bowerDirectory, 'video.js/dist/font/VideoJS.eot'), { destDir: 'assets/font' });
    app.import(path.join(app.bowerDirectory, 'video.js/dist/font/VideoJS.svg'), { destDir: 'assets/font' });
    app.import(path.join(app.bowerDirectory, 'video.js/dist/font/VideoJS.ttf'), { destDir: 'assets/font' });
    app.import(path.join(app.bowerDirectory, 'video.js/dist/font/VideoJS.woff'), { destDir: 'assets/font' });

    app.import('vendor/ivy-videojs/shims.js', {
      exports: {
        videojs: ['default']
      }
    });

    app.import({
      development: path.join(app.bowerDirectory, 'video.js/dist/video.js'),
      production:  path.join(app.bowerDirectory, 'video.js/dist/video.min.js')
    });

    app.import({
      development: path.join(app.bowerDirectory, 'videojs-contrib-hls/dist/videojs-contrib-hls.js'),
      production:  path.join(app.bowerDirectory, 'videojs-contrib-hls/dist/videojs-contrib-hls.min.js')
    });

    (options.languages || []).forEach(function(language) {
      app.import(path.join(app.bowerDirectory, 'video.js/dist/lang/' + language + '.js'));
    });

    app.import(path.join(app.bowerDirectory, 'video.js/dist/video-js.swf'), { destDir: 'assets' });
  }
};
