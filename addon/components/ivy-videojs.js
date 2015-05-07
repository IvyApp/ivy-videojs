import Ember from 'ember';
import videojs from 'videojs';

export default Ember.Component.extend({
  tagName: 'video',

  classNames: ['video-js'],

  concatenatedProperties: ['playerPropertyBindings'],

  playerEvents: {
    durationchange : 'durationChange',
    loadedmetadata : 'loadedMetadata',
    play           : 'play',
    seeked         : 'seeked',
    timeupdate     : 'timeUpdate',
    volumechange   : 'volumeChange'
  },

  playerPropertyBindings: [
    'autoplay',
    'controls',
    'height',
    'loop',
    'muted',
    'playbackRate',
    'poster',
    'preload',
    'volume',
    'width'
  ],

  currentTimeDidChange: Ember.on('seeked', 'timeUpdate', function(player) {
    this.set('currentTime', player.currentTime());
  }),

  durationDidChange: Ember.on('durationChange', function(player) {
    this.set('duration', player.duration());
  }),

  ready: function() {
    return this.get('_readyPromise');
  },

  volumeDidChange: Ember.on('volumeChange', function(player) {
    this.set('muted', player.muted());
    this.set('volume', player.volume());
  }),

  _applyPlayerProperty: function(player, property, newValue) {
    var method = player[property];

    if (method) {
      var oldValue = method.call(player);

      if (oldValue !== newValue) {
        method.call(player, newValue);
      }
    }
  },

  _applyPlayerPropertyBindings: function(player, playerPropertyBindings) {
    Ember.EnumerableUtils.forEach(playerPropertyBindings, function(property) {
      if (property in this) {
        var propertyValue = this.get(property);

        // If the property is null or undefined, read the value from the player
        // as a default value. This way we automatically pick up defaults from
        // video.js without having to specify them here.
        if (Ember.isNone(propertyValue)) {
          propertyValue = player[property].call(player);
          this.set(property, propertyValue);
        }

        this._setupPlayerPropertyBindingObservation(player, property);

        // Set the initial player value.
        this._applyPlayerProperty(player, property, propertyValue);
      }
    }, this);
  },

  _applyPropertiesToPlayer: function(player) {
    var playerPropertyBindings = this.playerPropertyBindings;
    if (playerPropertyBindings.length) {
      this._applyPlayerPropertyBindings(player, playerPropertyBindings);
    }
  },

  _didInitPlayer: function(player) {
    this._applyPropertiesToPlayer(player);
    this._setupPlayerEvents(player);

    this.one('willDestroyElement', function() {
      player.dispose();
    });
  },

  _initPlayer: Ember.on('didInsertElement', function() {
    var self = this;
    var element = this.get('element');
    var options = {};

    this.set('_readyPromise', new Ember.RSVP.Promise(function(resolve) {
      videojs(element, options, function() { resolve(this); });
    }));

    this.ready().then(function(player) {
      self._didInitPlayer(player);
    });
  }),

  _registerPlayerObserver: function(property, target, observer) {
    var scheduledObserver = function() {
      Ember.run.scheduleOnce('render', this, observer);
    };

    this.addObserver(property, target, scheduledObserver);

    this.one('willClearRender', this, function() {
      this.removeObserver(property, target, scheduledObserver);
    });
  },

  _setupPlayerEventHandler: function(player, event, eventName) {
    var handlerFunction = Ember.run.bind(this, function(e) {
      this.trigger(eventName, player, e);
    });

    // Bind an event handler to the player. We don't need to worry about
    // tearing it down since video.js does that for us on dispose.
    player.on(event, handlerFunction);
  },

  _setupPlayerEvents: function(player) {
    var event;
    var events = this.get('playerEvents');

    for (event in events) {
      if (events.hasOwnProperty(event)) {
        this._setupPlayerEventHandler(player, event, events[event]);
      }
    }
  },

  _setupPlayerPropertyBindingObservation: function(player, property) {
    var observer = function() {
      var propertyValue = this.get(property);
      this._applyPlayerProperty(player, property, propertyValue);
    };

    this._registerPlayerObserver(property, this, observer);
  }
});
