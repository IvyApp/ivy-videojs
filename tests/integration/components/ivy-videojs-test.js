import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ivy-videojs', 'Integration | Component | ivy-videojs', {
  integration: true
});

test('it sends a "durationchange" action when the duration can be determined', function(assert) {
  assert.expect(1);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('durationchange', resolve);
    this.render(hbs`{{ivy-videojs durationchange="durationchange" src="assets/small.mp4"}}`);
  }).then((player) => {
    assert.notEqual(0, player.duration());
  });
});

test('it sends a "play" action when played via the player API', function(assert) {
  assert.expect(2);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player) => {
      assert.ok(player.paused());
      this.on('play', resolve);
      player.play();
    });

    this.render(hbs`{{ivy-videojs play="play" ready="ready" src="assets/small.mp4"}}`);
  }).then((player) => {
    assert.ok(!player.paused());
  });
});

test('it sends a "ratechange" action when playbackRate is changed via the player API', function(assert) {
  assert.expect(2);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player) => {
      assert.equal(1.0, player.playbackRate());
      this.on('ratechange', resolve);
      player.playbackRate(1.5);
    });

    this.render(hbs`{{ivy-videojs ratechange="ratechange" ready="ready"}}`);
  }).then((player) => {
    assert.equal(1.5, player.playbackRate());
  });
});

test('it sends a "volumechange" action when muted is changed via bindings', function(assert) {
  assert.expect(2);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player) => {
      assert.ok(!player.muted());
      this.on('volumechange', resolve);
      this.set('muted', true);
    });

    this.render(hbs`{{ivy-videojs muted=muted ready="ready" src="assets/small.mp4" volumechange="volumechange"}}`);
  }).then((player) => {
    assert.ok(player.muted());
  });
});

test('it sends a "volumechange" action when muted is changed via the player API', function(assert) {
  assert.expect(2);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player) => {
      assert.ok(!player.muted());
      this.on('volumechange', resolve);
      player.muted(true);
    });

    this.render(hbs`{{ivy-videojs ready="ready" src="assets/small.mp4" volumechange="volumechange"}}`);
  }).then((player) => {
    assert.ok(player.muted());
  });
});

test('it sends a "volumechange" action when volume is changed via bindings', function(assert) {
  assert.expect(2);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player) => {
      assert.notEqual(0.5, player.volume());
      this.on('volumechange', resolve);
      this.set('volume', 0.5);
    });

    this.render(hbs`{{ivy-videojs ready="ready" volume=volume volumechange="volumechange"}}`);
  }).then((player) => {
    assert.equal(0.5, player.volume());
  });
});

test('it sends a "volumechange" action when volume is changed via the player API', function(assert) {
  assert.expect(2);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player) => {
      assert.notEqual(0.5, player.volume());
      this.on('volumechange', resolve);
      player.volume(0.5);
    });

    this.render(hbs`{{ivy-videojs ready="ready" volumechange="volumechange"}}`);
  }).then((player) => {
    assert.equal(0.5, player.volume());
  });
});

function propertyBindingTests(property, initialValue, updatedValue) {
  test(`it updates the "${property}" property of the player via bindings`, function(assert) {
    assert.expect(2);

    this.set(property, initialValue);

    return new Ember.RSVP.Promise((resolve) => {
      this.on('ready', resolve);
      this.render(Ember.HTMLBars.compile(`{{ivy-videojs ${property}=${property} ready="ready"}}`));
    }).then((player) => {
      assert.equal(initialValue, player[property]());

      Ember.run(this, function() {
        this.set(property, updatedValue);
      });

      assert.equal(updatedValue, player[property]());
    });
  });
}

propertyBindingTests('autoplay', false, true);
propertyBindingTests('controls', false, true);
propertyBindingTests('fluid', false, true);
propertyBindingTests('loop', false, true);
propertyBindingTests('muted', false, true);
propertyBindingTests('playbackRate', 1.0, 1.5);
propertyBindingTests('volume', 1.0, 0.5);
