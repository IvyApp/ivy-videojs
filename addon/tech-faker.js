import videojs from 'videojs';

var Tech = videojs.getComponent('Tech');

/**
 * A simulated video.js tech for use in cases where neither HTML5 nor Flash are
 * available, such as when running under PhantomJS.
 */
class TechFaker extends Tech {
  constructor(options, handleReady) {
    super(options, handleReady);

    this._autoplay = false;
    this._currentTime = 0;
    this._duration = 60;
    this._loop = false;
    this._playbackRate = 1.0;
    this._preload = false;
    this._muted = true;
    this._volume = 0;

    this.triggerReady();

    this.one('loadedmetadata', function() {
      this.trigger('durationchange');
    });

    // Ensure that loadedmetadata is triggered asynchronously.
    this.setTimeout(function() {
      this.ready(function() {
        this.trigger('loadedmetadata');
      });
    }, 1);
  }

  autoplay() {
    return this._autoplay;
  }

  currentTime() {
    return this._currentTime;
  }

  duration() {
    return this._duration;
  }

  loop() {
    return this._loop;
  }

  muted() {
    return this._muted;
  }

  play() {
    this.trigger('play');

    this.setTimeout(function() {
      this._currentTime++;
      this.trigger('timeupdate');
    }, 1);
  }

  playbackRate() {
    return this._playbackRate;
  }

  preload() {
    return this._preload;
  }

  setAutoplay(value) {
    this._autoplay = value;
  }

  setCurrentTime(value) {
    this._currentTime = value;
    this.trigger('seeked');
  }

  setLoop(value) {
    this._loop = value;
  }

  setMuted(value) {
    this._muted = value;
    this.trigger('volumechange');
  }

  setPlaybackRate(value) {
    this._playbackRate = value;
  }

  setPreload(value) {
    this._preload = value;
  }

  setVolume(value) {
    this._volume = value;
    this.trigger('volumechange');
  }

  volume() {
    return this._volume;
  }

  static canPlaySource(srcObj) {
    return srcObj.type !== 'video/unsupported-format';
  }

  static isSupported() {
    return true;
  }
}

TechFaker.prototype['featuresPlaybackRate'] = true;

export default TechFaker;
