import Ember from 'ember';
import videojs from 'videojs';

/**
 * Renders a `video` element, and applies a video.js player to it. Also
 * provides some methods for binding properties to the player, and for proxying
 * player events to actions.
 *
 * This is the lower-level component that `ivy-videojs` uses internally.
 *
 * @class
 * @extends Ember.Component
 */
export default Ember.Component.extend({

  tagName: Ember.computed.alias('type'),

  classNames: ['video-js'],

  mergedProperties: ['playerEvents'],

  /**
   * The set of video.js player events (and associated actions) to be set up
   * inside `didInsertElement`. If you need to respond to custom video.js
   * player events, such as those emitted by a plugin, you should do so by
   * calling `sendActionOnPlayerEvent` inside your `ready` handler.
   *
   * ```javascript
   * import Ember from 'ember';
   *
   * export default Ember.Controller.extend({
   *   actions: {
   *     ready(player, component) {
   *       component.sendActionOnPlayerEvent(player, 'actionName', 'eventName');
   *     }
   *   }
   * });
   * ```
   *
   * The above would send the `actionName` action in response to an `eventName`
   * event from the player.
   *
   * @property playerEvents
   * @type Object
   * @private
   */
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

  /**
   * Sets up a (one-way) binding for a property from this component to the
   * video.js player. If the property is changed, it will be propagated to the
   * video.js player (via `setPlayerProperty`).
   *
   * @method bindPropertyToPlayer
   * @param {Player} player the video.js player instance
   * @param {String} property the component property to bind
   * @param {String} playerProperty the video.js player property
   * @see {#setPlayerProperty}
   */
  bindPropertyToPlayer(player, property, playerProperty=property) {
    const observer = function() {
      this.setPlayerProperty(player, playerProperty, this.get(property));
    };

    const scheduledObserver = function() {
      Ember.run.scheduleOnce('render', this, observer);
    };

    this._addPlayerObserver(property, this, scheduledObserver);

    // Invoke the observer once to set the initial value on the player.
    observer.call(this);
  },

  /**
   * Initializes the video.js player, sets up event listeners defined in
   * `playerEvents`, and sends the `ready` action.
   *
   * @method didInsertElement
   */
  didInsertElement() {
    const player = videojs(this.get('element'), this.get('setup'));

    player.ready(() => {
      // Set up a handler to automatically dispose the player on teardown.
      this.one('willDestroyElement', function() {
        player.dispose();
      });

      // Set up event listeners defined in `playerEvents`.
      const playerEvents = this.get('playerEvents');
      if (playerEvents) {
        for (let key in playerEvents) {
          if (!playerEvents.hasOwnProperty(key)) { continue; }
          this.sendActionOnPlayerEvent(player, key, playerEvents[key]);
        }
      }

      // Let the outside world know that we're ready.
      this.sendAction('ready', player, this);
    });
  },

  /**
   * Sets up a listener that sends an action on a video.js player event.
   *
   * @method sendActionOnPlayerEvent
   * @param {Player} player the video.js player instance
   * @param {String} action the action name to be sent
   * @param {String} playerEvent the player event name to listen for
   */
  sendActionOnPlayerEvent(player, action, playerEvent=action) {
    const listenerFunction = (...args) => {
      this.sendAction(action, player, this, ...args);
    };

    this._onPlayerEvent(player, playerEvent, listenerFunction);
  },

  /**
   * Sets the value of a property on a video.js player. If the property is
   * already equal to the given value, no change is made.
   *
   * @method setPlayerProperty
   * @param {Player} player the video.js player instance
   * @param {String} playerProperty the name of the property to set
   * @param {Object} value the value to set
   */
  setPlayerProperty(player, playerProperty, value) {
    const propertyMethod = player[playerProperty];
    if (propertyMethod && value !== undefined) {
      const previousValue = propertyMethod.call(player);
      if (previousValue !== value) {
        propertyMethod.call(player, value);
      }
    }
  },

  _addPlayerObserver(property, target, observer) {
    if (this.isDestroying) {
      return;
    }

    this.addObserver(property, target, observer);

    this.one('willDestroyElement', this, function() {
      this.removeObserver(property, target, observer);
    });
  },

  _onPlayerEvent(player, eventName, listenerFunction) {
    player.on(eventName, listenerFunction);
  },

  click(e){
  	this.sendAction('playerclick', e);
  }

});
