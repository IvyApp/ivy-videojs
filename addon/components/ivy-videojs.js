import Component from '@ember/component';
import layout from '../templates/components/ivy-videojs';
import invokeAction from '../-internal/invoke-action';

function proxyAction(action) {
  return function(...args) {
    invokeAction(this, action, ...args);
  };
}

/**
 * Provides a simplified interface to the underlying `ivy-videojs-source`
 * component, which should (hopefully) be sufficient for most use cases.
 *
 * @class
 * @extends Ember.Component
 */
export default Component.extend({
  concatenatedProperties: ['playerAttributeBindings'],

  /**
   * Properties which will be bound to the video.js player.
   *
   * @property playerAttributeBindings
   * @type Array
   * @private
   */
  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
  playerAttributeBindings: [
    'autoplay',
    'controls',
    'fluid',
    'language',
    'loop',
    'muted',
    'playbackRate',
    'poster',
    'src',
    'volume'
  ],

  actions: {
    abort: proxyAction('abort'),
    canplay: proxyAction('canplay'),
    canplaythrough: proxyAction('canplaythrough'),
    durationchange: proxyAction('durationchange'),
    emptied: proxyAction('emptied'),
    ended: proxyAction('ended'),
    error: proxyAction('error'),
    loadeddata: proxyAction('loadeddata'),
    loadedmetadata: proxyAction('loadedmetadata'),
    loadstart: proxyAction('loadstart'),
    pause: proxyAction('pause'),
    play: proxyAction('play'),
    playing: proxyAction('playing'),
    progress: proxyAction('progress'),
    ratechange: proxyAction('ratechange'),
    resize: proxyAction('resize'),
    seeked: proxyAction('seeked'),
    seeking: proxyAction('seeking'),
    stalled: proxyAction('stalled'),
    suspend: proxyAction('suspend'),
    timeupdate: proxyAction('timeupdate'),
    useractive: proxyAction('useractive'),
    userinactive: proxyAction('userinactive'),
    volumechange: proxyAction('volumechange'),
    waiting: proxyAction('waiting'),

    ready(player, component, ...args) {
      this.setupPlayerAttributeBindings(player, component);
      invokeAction(this, 'ready', player, component, ...args);
    }
  },

  layout: layout,

  /**
   * Set up property bindings for each property defined in
   * `playerAttributeBindings`.
   *
   * @method setupPlayerAttributeBindings
   */
  setupPlayerAttributeBindings(player, component) {
    this.get('playerAttributeBindings').forEach(function(property) {
      component.bindPropertyToPlayer(player, property);
    });
  }
});
