import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ivy-videojs-player', 'Integration | Component | ivy-videojs-player', {
  integration: true
});

test('it sends a "ready" action when the player is ready', function(assert) {
  assert.expect(1);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', function() {
      assert.ok('"ready" action was sent');
      resolve();
    });

    this.render(hbs`{{ivy-videojs-player ready="ready"}}`);
  });
});

test('it sends an action on a player event via sendActionOnPlayerEvent', function(assert) {
  assert.expect(1);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player, component) => {
      component.sendActionOnPlayerEvent(player, 'customevent');

      this.on('customevent', function() {
        assert.ok('"customevent" action was sent');
        resolve();
      });

      player.trigger('customevent');
    });

    this.render(hbs`{{ivy-videojs-player customevent="customevent" ready="ready"}}`);
  });
});

test('it sends an action on a player event with a different name via sendActionOnPlayerEvent', function(assert) {
  assert.expect(1);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player, component) => {
      component.sendActionOnPlayerEvent(player, 'customEvent', 'customevent');

      this.on('customEvent', function() {
        assert.ok('"customEvent" action was sent');
        resolve();
      });

      player.trigger('customevent');
    });

    this.render(hbs`{{ivy-videojs-player customEvent="customEvent" ready="ready"}}`);
  });
});

test('it binds a component property to a player property via bindPropertyToPlayer', function(assert) {
  assert.expect(2);

  this.set('controls', false);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player, component) => {
      component.bindPropertyToPlayer(player, 'controls');

      assert.equal(false, player.controls());
      Ember.run(this, function() { this.set('controls', true); });
      assert.equal(true, player.controls());

      resolve();
    });

    this.render(hbs`{{ivy-videojs-player controls=controls ready="ready"}}`);
  });
});

test('it binds a component property to a player property with a different name via bindPropertyToPlayer', function(assert) {
  assert.expect(2);

  this.set('customControls', false);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player, component) => {
      component.bindPropertyToPlayer(player, 'customControls', 'controls');

      assert.equal(false, player.controls());
      Ember.run(this, function() { this.set('customControls', true); });
      assert.equal(true, player.controls());

      resolve();
    });

    this.render(hbs`{{ivy-videojs-player customControls=customControls ready="ready"}}`);
  });
});

test('it sends a "durationchange" action when the duration can be determined', function(assert) {
  assert.expect(1);

  this.set('src', 'assets/small.mp4');

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player, component) => {
      component.bindPropertyToPlayer(player, 'src');

      this.on('durationchange', function(player) {
        assert.equal(5.568, player.duration());
        resolve();
      });
    });

    this.render(hbs`{{ivy-videojs-player durationchange="durationchange" ready="ready" src=src}}`);
  });
});

test('it sends a "play" action when played via the player API', function(assert) {
  assert.expect(2);

  this.set('src', 'assets/small.mp4');

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player, component) => {
      component.bindPropertyToPlayer(player, 'src');

      this.on('play', function(player) {
        assert.equal(false, player.paused());
        resolve();
      });

      this.on('canplay', function(player) {
        assert.equal(true, player.paused());
        player.play();
      });
    });

    this.render(hbs`{{ivy-videojs-player canplay="canplay" play="play" ready="ready" src=src}}`);
  });
});

test('it sends a "ratechange" action when playbackRate is changed via the player API', function(assert) {
  assert.expect(2);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player) => {
      this.on('ratechange', function(player) {
        assert.equal(1.5, player.playbackRate());
        resolve();
      });

      assert.equal(1.0, player.playbackRate());
      player.playbackRate(1.5);
    });

    this.render(hbs`{{ivy-videojs-player ratechange="ratechange" ready="ready"}}`);
  });
});

test('it sends a "volumechange" action when muted via the player API', function(assert) {
  assert.expect(2);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player) => {
      this.on('volumechange', function(player) {
        assert.equal(true, player.muted());
        resolve();
      });

      assert.equal(false, player.muted());
      player.muted(true);
    });

    this.render(hbs`{{ivy-videojs-player ready="ready" volumechange="volumechange"}}`);
  });
});

test('it sends a "volumechange" action when volume is changed via the player API', function(assert) {
  assert.expect(2);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player) => {
      this.on('volumechange', function(player) {
        assert.equal(0.5, player.volume());
        resolve();
      });

      assert.equal(1.0, player.volume());
      player.volume(0.5);
    });

    this.render(hbs`{{ivy-videojs-player ready="ready" volumechange="volumechange"}}`);
  });
});

test('it sends a "volumechange" action when muted via bindings', function(assert) {
  assert.expect(2);

  this.set('muted', false);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player, component) => {
      component.bindPropertyToPlayer(player, 'muted');

      this.on('volumechange', function(player) {
        assert.equal(true, player.muted());
        resolve();
      });

      assert.equal(false, player.muted());
      this.set('muted', true);
    });

    this.render(hbs`{{ivy-videojs-player muted=muted ready="ready" volumechange="volumechange"}}`);
  });
});

test('it sends a "volumechange" action when volume is changed via bindings', function(assert) {
  assert.expect(2);

  this.set('volume', 1.0);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player, component) => {
      component.bindPropertyToPlayer(player, 'volume');

      this.on('volumechange', function(player) {
        assert.equal(0.5, player.volume());
        resolve();
      });

      assert.equal(1.0, player.volume());
      this.set('volume', 0.5);
    });

    this.render(hbs`{{ivy-videojs-player ready="ready" volume=volume volumechange="volumechange"}}`);
  });
});
