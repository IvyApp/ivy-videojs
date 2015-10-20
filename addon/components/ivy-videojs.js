import Ember from 'ember';
import layout from '../templates/components/ivy-videojs';

function proxyAction(action) {
  return function(...args) {
    this.sendAction(action, ...args);
  };
}

export default Ember.Component.extend({
  concatenatedProperties: ['playerAttributeBindings'],

  playerAttributeBindings: [
    'autoplay',
    'controls',
    'fluid',
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
      this.sendAction('ready', player, component, ...args);
    }
  },

  layout: layout,

  setupPlayerAttributeBindings(player, component) {
    this.get('playerAttributeBindings').forEach(function(property) {
      component.bindPropertyToPlayer(player, property);
    });
  }
});
