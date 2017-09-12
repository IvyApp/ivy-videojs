import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ivy-videojs', 'Integration | Component | ivy-videojs', {
  integration: true
});

test('it sends a "ready" action when the player is ready', function(assert) {
  assert.expect(1);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', function() {
      assert.ok('"ready" action was sent');
      resolve();
    });

    this.render(hbs`{{ivy-videojs ready="ready"}}`);
  });
});

test(`it binds the "controls" property to the player`, function(assert) {
  assert.expect(1);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player) => {
      Ember.run(this, function() { this.set('controls', true); });
      assert.equal(player['controls'](), true);

      resolve();
    });
    this.render(hbs`{{ivy-videojs controls=controls ready="ready"}}`);
  });
});

test(`it binds the "fluid" property to the player`, function(assert) {
  assert.expect(1);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player) => {
      Ember.run(this, function() { this.set('fluid', true); });
      assert.equal(player['fluid'](), true);

      resolve();
    });
    this.render(hbs`{{ivy-videojs fluid=fluid ready="ready"}}`);
  });
});

test(`it binds the "language" property to the player`, function(assert) {
  assert.expect(1);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player) => {
      Ember.run(this, function() { this.set('language', 'es'); });
      assert.equal(player['language'](), 'es');

      resolve();
    });
    this.render(hbs`{{ivy-videojs language=language ready="ready"}}`);
  });
});

test(`it binds the "loop" property to the player`, function(assert) {
  assert.expect(1);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player) => {
      Ember.run(this, function() { this.set('loop', true); });
      assert.equal(player['loop'](), true);

      resolve();
    });
    this.render(hbs`{{ivy-videojs loop=loop ready="ready"}}`);
  });
});

test(`it binds the "muted" property to the player`, function(assert) {
  assert.expect(1);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player) => {
      Ember.run(this, function() { this.set('muted', true); });
      assert.equal(player['muted'](), true);

      resolve();
    });
    this.render(hbs`{{ivy-videojs muted=muted ready="ready"}}`);
  });
});

test(`it binds the "playbackRate" property to the player`, function(assert) {
  assert.expect(1);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player) => {
      Ember.run(this, function() { this.set('playbackRate', 1.5); });
      assert.equal(player['playbackRate'](), 1.5);

      resolve();
    });
    this.render(hbs`{{ivy-videojs playbackRate=playbackRate ready="ready"}}`);
  });
});

test(`it binds the "poster" property to the player`, function(assert) {
  assert.expect(1);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player) => {
      Ember.run(this, function() { this.set('poster', 'assets/small.png'); });
      assert.equal(player['poster'](), 'assets/small.png');
      resolve();
    });
    this.render(hbs`{{ivy-videojs poster=poster ready="ready"}}`);
  });
});

test(`it binds the "volume" property to the player`, function(assert) {
  assert.expect(1);

  return new Ember.RSVP.Promise((resolve) => {
    this.on('ready', (player) => {
      Ember.run(this, function() { this.set('volume', 0.5); });
      assert.equal(player['volume'](),  0.5);

      resolve();
    });
    this.render(hbs`{{ivy-videojs volume=volume ready="ready"}}`);
  });
});
