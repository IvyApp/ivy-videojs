module.exports = {
  description: 'ivy-videojs',

  afterInstall: function() {
    return this.addBowerPackagesToProject([
    	{ name: 'video.js', target: '~5.12'},
    	{ name: 'videojs-contrib-hls', target: '~5.11'}
    ]);
  },

  normalizeEntityName: function() {
    // This prevents an error when the entityName is not specified.
  }
};
