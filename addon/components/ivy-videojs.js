import Ember from 'ember';
import videojs from 'videojs';

export default Ember.Component.extend({
  tagName: 'video',
  classNames: ['video-js'],

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

  _bindVideojsEvent: function(eventName) {
    var self = this;

    // Bind an event handler to the player. We don't need to worry about
    // tearing it down since video.js does that for us on dispose.
    this.get('player').on(eventName, function(event) {
      self.trigger(eventName, this, event);
    });
  },

  _bindVideojsProperty: function(propertyName) {
    var player = this.get('player');
    var method = player[propertyName];

    if (method) {
      // If the property is null or undefined, read the value from the player
      // as a default value. This way we automatically pick up defaults from
      // video.js without having to duplicate them ourselves.
      if (Ember.isNone(this.get(propertyName))) {
        this.set(propertyName, method.call(player));
      }

      this._addVideojsPropertyObserver(propertyName);
      this._videojsPropertyDidChange(this, propertyName);
    }
  },

  _didInitVideojs: Ember.on('ready', function(player) {
    this.set('player', player);

    this._bindVideojsEvent('durationchange');
    this._bindVideojsEvent('loadedmetadata');
    this._bindVideojsEvent('seeked');
    this._bindVideojsEvent('timeupdate');
    this._bindVideojsEvent('volumechange');

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

    this.one('willDestroyElement', function() {
      player.dispose();
    });
  }),

  _initVideojs: Ember.on('didInsertElement', function() {
    var self = this;
    var element = this.get('element');
    var options = {};

    videojs(element, options, function() {
      self.trigger('ready', this);
    });
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
