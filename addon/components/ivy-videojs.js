import Ember from 'ember';
import videojs from 'videojs';

export default Ember.Component.extend({
  tagName: 'video',
  classNames: ['video-js'],

  awaitLoadedMetadata: function() {
    return this._awaitEvent('loadedmetadata');
  },

  awaitReady: function() {
    return this.get('readyPromise');
  },

  awaitSeeked: function() {
    return this._awaitEvent('seeked');
  },

  awaitVolumeChange: function() {
    return this._awaitEvent('volumechange');
  },

  updateCurrentTime: Ember.on('seeked', 'timeupdate', function(player) {
    this.set('currentTime', player.currentTime());
  }),

  updateDuration: Ember.on('durationchange', function(player) {
    this.set('duration', player.duration());
  }),

  updateVolume: Ember.on('volumechange', function(player) {
    this.set('volume', player.volume());
  }),

  _addVideojsPropertyObserver: function(propertyName) {
    this.addObserver(propertyName, this, this._videojsPropertyDidChange);

    this.one('willDestroyElement', this, function() {
      this.removeObserver(propertyName, this, this._videojsPropertyDidChange);
    });
  },

  _awaitEvent: function(eventName) {
    var self = this;

    return this.awaitReady().then(function() {
      return new Ember.RSVP.Promise(function(resolve) {
        self.one(eventName, resolve);
      });
    });
  },

  _bindVideojsEvent: function(eventName) {
    var self = this;

    // Bind an event handler to the player. We don't need to worry about
    // tearing it down since video.js does that for us on dispose.
    this.get('player').on(eventName, function(event) {
      self.trigger(eventName, this, event);
    });
  },

  _bindVideojsEvents: function() {
    this._bindVideojsEvent('durationchange');
    this._bindVideojsEvent('loadedmetadata');
    this._bindVideojsEvent('seeked');
    this._bindVideojsEvent('timeupdate');
    this._bindVideojsEvent('volumechange');
  },

  _bindVideojsProperty: function(propertyName) {
    var player = this.get('player');
    var method = player[propertyName];

    if (method) {
      var initialValue = method.call(player);

      // Set the initial value from the player. This way we automatically pick
      // up defaults from video.js without having to duplicate them here.
      this.set(propertyName, initialValue);

      this._addVideojsPropertyObserver(propertyName);
      this._videojsPropertyDidChange(this, propertyName);
    }
  },

  _bindVideojsProperties: function() {
    this._bindVideojsProperty('autoplay');
    this._bindVideojsProperty('controls');
    this._bindVideojsProperty('currentTime');
    this._bindVideojsProperty('height');
    this._bindVideojsProperty('loop');
    this._bindVideojsProperty('muted');
    this._bindVideojsProperty('playbackRate');
    this._bindVideojsProperty('poster');
    this._bindVideojsProperty('preload');
    this._bindVideojsProperty('volume');
    this._bindVideojsProperty('width');
  },

  _didInitVideojs: function(player) {
    this.set('player', player);

    this._bindVideojsEvents();
    this._bindVideojsProperties();

    this.one('willDestroyElement', function() {
      player.dispose();
    });
  },

  _initVideojs: Ember.on('didInsertElement', function() {
    var self = this;
    var element = this.get('element');
    var options = {};

    this.set('readyPromise', new Ember.RSVP.Promise(function(resolve) {
      videojs(element, options, function() {
        self._didInitVideojs(this);
        resolve();
      });
    }));
  }),

  _videojsPropertyDidChange: function(sender, key) {
    var player = sender.get('player');
    var method = player[key];

    if (method) {
      var oldValue = method.call(player);
      var newValue = sender.get(key);

      if (oldValue !== newValue) {
        method.call(player, newValue);
      }
    }
  }
});
