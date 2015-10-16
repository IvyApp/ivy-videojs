import Ember from 'ember';
import videojs from 'videojs';

export default Ember.Component.extend({
  tagName: 'video',

  classNames: ['video-js'],

  playerAttributeBindings: [
    'autoplay',
    'controls',
    'fluid',
    'height',
    'loop',
    'muted',
    'playbackRate',
    'poster',
    'preload',
    'src',
    'volume',
    'width'
  ],

  playerEvents: [
    'abort',
    'canplay',
    'canplaythrough',
    'durationchange',
    'emptied',
    'ended',
    'error',
    'loadeddata',
    'loadedmetadata',
    'loadstart',
    'pause',
    'play',
    'playing',
    'progress',
    'ratechange',
    'resize',
    'seeked',
    'seeking',
    'stalled',
    'suspend',
    'timeupdate',
    'useractive',
    'userinactive',
    'volumechange',
    'waiting'
  ],

  didInsertElement() {
    let player = videojs(this.get('element'));

    player.ready(() => {
      this._playerBecameReady(player);
    });
  },

  _applyPlayerAttribute(player, attrName, newValue) {
    let method = player[attrName];

    if (method) {
      let oldValue = method.call(player);

      if (newValue !== oldValue) {
        method.call(player, newValue);
      }
    }
  },

  _playerBecameReady(player) {
    this._setupPlayerAttributes(player);
    this._setupPlayerEvents(player);

    this.one('willDestroyElement', function() {
      player.dispose();
    });

    this.sendAction('ready', player);
  },

  _registerPlayerObserver(property, target, observer) {
    let scheduledObserver = function() {
      Ember.run.scheduleOnce('render', this, observer);
    };

    this.addObserver(property, target, scheduledObserver);

    this.one('willClearRender', this, function() {
      this.removeObserver(property, target, scheduledObserver);
    });
  },

  _setupPlayerAttributeBindingObservation(player, property, attrName) {
    let observer = function() {
      let propertyValue = this.get(property);
      this._applyPlayerAttribute(player, attrName, propertyValue);
    };

    this._registerPlayerObserver(property, this, observer);

    if (!this.isDestroyed) {
      observer.call(this);
    }
  },

  _setupPlayerAttributes(player) {
    this.playerAttributeBindings.forEach(function(binding) {
      let colonIndex = binding.indexOf(':'), property, attrName;

      if (colonIndex === -1) {
        property = binding;
        attrName = binding;
      } else {
        property = binding.substring(0, colonIndex);
        attrName = binding.substring(colonIndex + 1);
      }

      this._setupPlayerAttributeBindingObservation(player, property, attrName);
    }, this);
  },

  _setupPlayerEventHandler(player, eventName) {
    let handlerFunction = Ember.run.bind(this, function() {
      this.sendAction(eventName, player);
    });

    // Bind an event handler to the player. We don't need to worry about
    // tearing it down since video.js does that for us on dispose.
    player.on(eventName, handlerFunction);
  },

  _setupPlayerEvents(player) {
    this.playerEvents.forEach(function(eventName) {
      this._setupPlayerEventHandler(player, eventName);
    }, this);
  }
});
