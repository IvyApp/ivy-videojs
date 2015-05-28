import Ember from 'ember';
import videojs from 'videojs';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ivy-videojs', {
  integration: true
});

var template =
  '{{#ivy-videojs autoplay=autoplay autoresize=autoresize controls=controls currentHeight=currentHeight currentTime=currentTime currentWidth=currentWidth id="ivy-videojs" loop=loop muted=muted naturalHeight=naturalHeight naturalWidth=naturalWidth playbackRate=playbackRate poster=poster preload=preload ready="ready" volume=volume}}' +
  '  {{ivy-videojs-source src="assets/small.mp4" type="video/mp4"}}' +
  '  {{ivy-videojs-source src="assets/small.webm" type="video/webm"}}' +
  '{{/ivy-videojs}}';

test('should update currentTime on seeked', function(assert) {
  var context = this;

  return new Ember.RSVP.Promise(function(resolve) {
    context.on('ready', resolve);
    context.render(template);
  }).then(function() {
    var player = videojs.getPlayers()['ivy-videojs'];

    return new Ember.RSVP.Promise(function(resolve) {
      player.one('loadedmetadata', resolve);
      player.load();
    }).then(function() {
      return new Ember.RSVP.Promise(function(resolve) {
        player.one('seeked', resolve);
        player.currentTime(2);
      });
    }).then(function() {
      assert.equal(context.get('currentTime'), 2);
    });
  });
});

test('should update currentTime on timeUpdate', function(assert) {
  var context = this;

  return new Ember.RSVP.Promise(function(resolve) {
    context.on('ready', resolve);
    context.render(template);
  }).then(function() {
    var player = videojs.getPlayers()['ivy-videojs'];

    return new Ember.RSVP.Promise(function(resolve) {
      player.one('loadedmetadata', resolve);
      player.load();
    }).then(function() {
      return new Ember.RSVP.Promise(function(resolve) {
        player.one('play', resolve);
        player.play();
      });
    }).then(function() {
      return new Ember.RSVP.Promise(function(resolve) {
        player.one('timeupdate', resolve);
      });
    }).then(function() {
      assert.notEqual(context.get('currentTime'), 0);
    });
  });
});

test('should update duration on durationChange', function(assert) {
  var context = this;

  return new Ember.RSVP.Promise(function(resolve) {
    context.on('ready', resolve);
    context.render(template);
  }).then(function() {
    var player = videojs.getPlayers()['ivy-videojs'];

    return new Ember.RSVP.Promise(function(resolve) {
      player.one('durationchange', resolve);
      player.load();
    }).then(function() {
      assert.notEqual(context.get('duration'), 0);
    });
  });
});

test('should update muted on volumeChange', function(assert) {
  var context = this;

  return new Ember.RSVP.Promise(function(resolve) {
    context.on('ready', resolve);
    context.render(template);
  }).then(function() {
    var player = videojs.getPlayers()['ivy-videojs'];

    return new Ember.RSVP.Promise(function(resolve) {
      player.one('volumechange', resolve);
      player.muted(true);
    }).then(function() {
      assert.equal(context.get('muted'), true);
    });
  });
});

test('should update volume on volumeChange', function(assert) {
  var context = this;

  return new Ember.RSVP.Promise(function(resolve) {
    context.on('ready', resolve);
    context.render(template);
  }).then(function() {
    var player = videojs.getPlayers()['ivy-videojs'];

    return new Ember.RSVP.Promise(function(resolve) {
      player.one('volumechange', resolve);
      player.volume(0.5);
    }).then(function() {
      assert.equal(context.get('volume'), 0.5);
    });
  });
});

test('should fill its parent container when autoresize is true', function(assert) {
  this.set('autoresize', true);
  this.set('naturalHeight', 320);
  this.set('naturalWidth', 560);

  var context = this;

  return new Ember.RSVP.Promise(function(resolve) {
    context.on('ready', function() {
      Ember.run.scheduleOnce('afterRender', resolve);
    });

    context.render(template);
  }).then(function() {
    assert.equal(context.get('currentWidth'), context.$().width());
  });
});

function videojsPropertyTest(property, attrName, value) {
  test('should bind ' + property + ' property to player ' + attrName + ' attribute', function(assert) {
    this.set(property, value);

    var context = this;

    return new Ember.RSVP.Promise(function(resolve) {
      context.on('ready', resolve);
      context.render(template);
    }).then(function() {
      var player = videojs.getPlayers()['ivy-videojs'];

      assert.equal(player[attrName](), value);
    });
  });
}

videojsPropertyTest('autoplay', 'autoplay', true);
videojsPropertyTest('controls', 'controls', true);
videojsPropertyTest('currentHeight', 'height', 320);
videojsPropertyTest('currentWidth', 'width', 560);
videojsPropertyTest('loop', 'loop', true);
videojsPropertyTest('muted', 'muted', true);
videojsPropertyTest('playbackRate', 'playbackRate', 1.5);
videojsPropertyTest('poster', 'poster', 'assets/small.png');
videojsPropertyTest('preload', 'preload', 'none');
videojsPropertyTest('volume', 'volume', 0.5);
