module.exports = {
  description: 'ivy-videojs',

  afterInstall: function() {
    return this.addBowerPackageToProject('video.js', '^5.0.0');
    return this.addBowerPackageToProject('videojs-contrib-hls', '*');
  },

  normalizeEntityName: function() {
    // This prevents an error when the entityName is not specified.
  }
};
