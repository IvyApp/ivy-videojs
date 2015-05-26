import Ember from 'ember';
import videojs from 'videojs';

export default Ember.Component.extend({
  tagName: 'video',

  classNames: ['video-js'],

  concatenatedProperties: ['playerAttributeBindings'],

  playerEvents: {
    durationchange : 'durationChange',
    loadedmetadata : 'loadedMetadata',
    play           : 'play',
    resize         : 'resize',
    seeked         : 'seeked',
    timeupdate     : 'timeUpdate',
    volumechange   : 'volumeChange'
  },

  playerAttributeBindings: [
    'autoplay',
    'controls',
    'currentHeight:height',
    'currentWidth:width',
    'loop',
    'muted',
    'playbackRate',
    'poster',
    'preload',
    'volume'
  ],

  autoresize: false,

  currentTimeDidChange: Ember.on('seeked', 'timeUpdate', function(player) {
    this.set('currentTime', player.currentTime());
  }),

  dimensionsDidChange: Ember.on('resize', function(player) {
    this.setProperties({
      currentHeight: player.height(),
      currentWidth:  player.width()
    });
  }),

  durationDidChange: Ember.on('durationChange', function(player) {
    this.set('duration', player.duration());
  }),

  naturalAspectRatio: Ember.computed(function() {
    return this.get('naturalHeight') / this.get('naturalWidth');
  }).property('naturalHeight', 'naturalWidth'),

  volumeDidChange: Ember.on('volumeChange', function(player) {
    this.set('muted', player.muted());
    this.set('volume', player.volume());
  }),

  _applyAttributesToPlayer: function(player) {
    var playerAttributeBindings = this.playerAttributeBindings;
    if (playerAttributeBindings.length) {
      this._applyPlayerAttributeBindings(player, playerAttributeBindings);
    }
  },

  _applyPlayerAttribute: function(player, attrName, newValue) {
    var method = player[attrName];

    if (method) {
      var oldValue = method.call(player);

      if (oldValue !== newValue) {
        method.call(player, newValue);
      }
    }
  },

  _applyPlayerAttributeBindings: function(player, playerAttributeBindings) {
    Ember.EnumerableUtils.forEach(playerAttributeBindings, function(binding) {
      var colonIndex = binding.indexOf(':'), property, attrName;

      if (colonIndex === -1) {
        property = binding;
        attrName = binding;
      } else {
        property = binding.substring(0, colonIndex);
        attrName = binding.substring(colonIndex + 1);
      }

      var propertyValue = this.get(property);

      // If the property is null or undefined, read the value from the player
      // as a default value. This way we automatically pick up defaults from
      // video.js without having to specify them here.
      if (Ember.isNone(propertyValue)) {
        propertyValue = player[attrName].call(player);
        this.set(property, propertyValue);
      }

      this._setupPlayerAttributeBindingObservation(player, property, attrName);

      // Set the initial player value.
      this._applyPlayerAttribute(player, attrName, propertyValue);
    }, this);
  },

  _autoresizePlayer: function(player) {
    if (!this.get('autoresize')) { return; }

    var naturalAspectRatio = this.get('naturalAspectRatio');
    var parentWidth = Ember.$(player.el().parentNode).width();

    this.setProperties({
      currentHeight: parentWidth * naturalAspectRatio,
      currentWidth:  parentWidth
    });
  },

  _didInitPlayer: function(player) {
    this._applyAttributesToPlayer(player);
    this._setupPlayerEvents(player);
    this._setupAutoresize(player);

    this.sendAction('ready');

    this.one('willDestroyElement', function() {
      player.dispose();
    });
  },

  _initPlayer: Ember.on('didInsertElement', function() {
    var self = this;
    var element = this.get('element');
    var options = {};

    videojs(element, options, function() {
      Ember.run(self, self._didInitPlayer, this);
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

  _setupAutoresize: function(player) {
    this._setupResizeListener(player);

    var observer = function() {
      this._autoresizePlayer(player);
    };

    this._registerPlayerObserver('autoresize', this, observer);
    this._registerPlayerObserver('naturalAspectRatio', this, observer);

    // Set the initial player size.
    Ember.run.scheduleOnce('render', this, observer);
  },

  _setupPlayerAttributeBindingObservation: function(player, property, attrName) {
    var observer = function() {
      var propertyValue = this.get(property);
      this._applyPlayerAttribute(player, attrName, propertyValue);
    };

    this._registerPlayerObserver(property, this, observer);
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

  _setupResizeListener: function(player) {
    var handlerFunction = Ember.run.bind(this, function() {
      this._autoresizePlayer(player);
    });

    // Debounce the handler function so that it only fires once the window has
    // stopped resizing for 150ms.
    var debouncedFunction = function() {
      Ember.run.debounce(this, handlerFunction, 150);
    };

    Ember.$(window).on('resize', debouncedFunction);

    this.one('willClearRender', function() {
      Ember.$(window).off('resize', debouncedFunction);
    });
  }
});
