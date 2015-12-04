import Ember from 'ember';
import videojs from 'videojs';

export default Ember.Component.extend({
  tagName: 'video',

  classNames: ['video-js'],

  mergedProperties: ['playerEvents'],

  playerEvents: {
    abort: 'abort',
    canplay: 'canplay',
    canplaythrough: 'canplaythrough',
    durationchange: 'durationchange',
    emptied: 'emptied',
    ended: 'ended',
    error: 'error',
    loadeddata: 'loadeddata',
    loadedmetadata: 'loadedmetadata',
    loadstart: 'loadstart',
    pause: 'pause',
    play: 'play',
    playing: 'playing',
    progress: 'progress',
    ratechange: 'ratechange',
    resize: 'resize',
    seeked: 'seeked',
    seeking: 'seeking',
    stalled: 'stalled',
    suspend: 'suspend',
    timeupdate: 'timeupdate',
    useractive: 'useractive',
    userinactive: 'userinactive',
    volumechange: 'volumechange',
    waiting: 'waiting'
  },

  bindPropertyToPlayer(player, property, playerProperty=property) {
    let observer = function() {
      this.setPlayerProperty(player, playerProperty, this.get(property));
    };

    let scheduledObserver = function() {
      Ember.run.scheduleOnce('render', this, observer);
    };

    this._addPlayerObserver(property, this, scheduledObserver);

    // Invoke the observer once to set the initial value on the player.
    observer.call(this);
  },

  didInsertElement() {
    let player = videojs(this.get('element'), this.get('setup'));

    player.ready(() => {
      this.one('willDestroyElement', function() {
        player.dispose();
      });

      let playerEvents = this.get('playerEvents');
      if (playerEvents) {
        for (let key in playerEvents) {
          this.sendActionOnPlayerEvent(player, key, playerEvents[key]);
        }
      }

      this.sendAction('ready', player, this);
    });
  },

  sendActionOnPlayerEvent(player, action, playerEvent=action) {
    let listenerFunction = (...args) => {
      this.sendAction(action, player, this, ...args);
    };

    this._onPlayerEvent(player, playerEvent, listenerFunction);
  },

  setPlayerProperty(player, playerProperty, value) {
    let propertyMethod = player[playerProperty];
    if (propertyMethod) {
      let previousValue = propertyMethod.call(player);
      if (previousValue !== value) {
        propertyMethod.call(player, value);
      }
    }
  },

  _addPlayerObserver(property, target, observer) {
    this.addObserver(property, target, observer);

    this.one('willDestroyElement', this, function() {
      this.removeObserver(property, target, observer);
    });
  },

  _onPlayerEvent(player, eventName, listenerFunction) {
    player.on(eventName, listenerFunction);
  }
});
