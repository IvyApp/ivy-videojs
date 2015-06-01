module.exports = {
  description: 'ivy-videojs',

  afterInstall: function() {
    return this.addBowerPackageToProject('video.js', '~5.0.0-29');
  },

  normalizeEntityName: function() {
    // This prevents an error when the entityName is not specified.
  }
};
