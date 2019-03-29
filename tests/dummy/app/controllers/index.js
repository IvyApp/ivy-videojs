import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    abort() {
      this.incrementProperty('abortCount');
    },

    canplay() {
      this.incrementProperty('canplayCount');
    },

    canplaythrough() {
      this.incrementProperty('canplaythroughCount');
    },

    durationchange(player) {
      this.set('duration', player.duration());
      this.incrementProperty('durationchangeCount');
    },

    emptied() {
      this.incrementProperty('emptiedCount');
    },

    ended() {
      this.incrementProperty('endedCount');
    },

    error() {
      this.incrementProperty('errorCount');
    },

    loadeddata() {
      this.incrementProperty('loadeddataCount');
    },

    loadedmetadata() {
      this.incrementProperty('loadedmetadataCount');
    },

    loadstart(player) {
      this.set('currentSrc', player.currentSrc());
      this.incrementProperty('loadstartCount');
    },

    pause() {
      this.set('paused', true);
      this.incrementProperty('pauseCount');
    },

    play() {
      this.incrementProperty('playCount');
    },

    playing() {
      this.set('paused', false);
      this.incrementProperty('playingCount');
    },

    progress() {
      this.incrementProperty('progressCount');
    },

    ratechange(player) {
      this.set('playbackRate', player.playbackRate());
      this.incrementProperty('ratechangeCount');
    },

    ready(player, component) {
      component.bindPropertyToPlayer(player, 'controls');
      component.bindPropertyToPlayer(player, 'fluid');
      component.bindPropertyToPlayer(player, 'loop');
      component.bindPropertyToPlayer(player, 'muted');
      component.bindPropertyToPlayer(player, 'playbackRate');
      component.bindPropertyToPlayer(player, 'poster');
      component.bindPropertyToPlayer(player, 'src');
      component.bindPropertyToPlayer(player, 'volume');
    },

    resize() {
      this.incrementProperty('resizeCount');
    },

    seeked() {
      this.set('seeking', false);
      this.incrementProperty('seekedCount');
    },

    seeking() {
      this.set('seeking', true);
      this.incrementProperty('seekingCount');
    },

    stalled() {
      this.incrementProperty('stalledCount');
    },

    suspend() {
      this.incrementProperty('suspendCount');
    },

    timeupdate(player) {
      this.set('currentTime', player.currentTime());
      this.incrementProperty('timeupdateCount');
    },

    useractive() {
      this.incrementProperty('useractiveCount');
    },

    userinactive() {
      this.incrementProperty('userinactiveCount');
    },

    volumechange(player) {
      this.set('muted', player.muted());
      this.set('volume', player.volume());
      this.incrementProperty('volumechangeCount');
    },

    waiting() {
      this.incrementProperty('waitingCount');
    }
  },

  // Media properties
  controls: true,
  fluid: true,
  loop: false,
  muted: false,
  playbackRate: 1,
  poster: 'https://vjs.zencdn.net/v/oceans.png',
  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
  setup: {
    playbackRates: [0.5, 1, 1.5, 2]
  },
  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
  src: [
    { src: 'https://vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' },
    { src: 'https://vjs.zencdn.net/v/oceans.webm', type: 'video/webm' }
  ],
  volume: 1,

  // Media events
  abortCount: 0,
  canplayCount: 0,
  canplaythroughCount: 0,
  durationchangeCount: 0,
  emptiedCount: 0,
  endedCount: 0,
  errorCount: 0,
  loadeddataCount: 0,
  loadedmetadataCount: 0,
  loadstartCount: 0,
  pauseCount: 0,
  playCount: 0,
  playingCount: 0,
  progressCount: 0,
  ratechangeCount: 0,
  resizeCount: 0,
  seekedCount: 0,
  seekingCount: 0,
  stalledCount: 0,
  suspendCount: 0,
  timeupdateCount: 0,
  useractiveCount: 0,
  userinactiveCount: 0,
  volumechangeCount: 0,
  waitingCount: 0
});
