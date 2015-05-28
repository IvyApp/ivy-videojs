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
    this._paused = true;
    this._playbackRate = 1.0;
    this._preload = false;
    this._muted = true;
    this._volume = 0;

    this.on('loadstart', function() {
      this.setTimeout(function() {
        this.trigger('loadedmetadata');
      }, 1);
    });

    this.on('loadedmetadata', function() {
      this.setTimeout(function() {
        this.trigger('durationchange');
        this.trigger('loadeddata');
      }, 1);
    });

    this.on('loadeddata', function() {
      this.setTimeout(function() {
        this.trigger('loadedalldata');
      }, 1);
    });

    this.triggerReady();
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

  load() {
    this.setTimeout(function() {
      this.trigger('loadstart');
    }, 1);
  }

  loop() {
    return this._loop;
  }

  muted() {
    return this._muted;
  }

  pause() {
    this._paused = true;
    this.trigger('pause');
  }

  paused() {
    return this._paused;
  }

  play() {
    this._paused = false;
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
