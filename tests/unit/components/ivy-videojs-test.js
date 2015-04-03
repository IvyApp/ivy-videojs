import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ivy-videojs', 'unit/components/ivy-videojs', {
  needs: ['component:ivy-videojs-source']
});

var template = Ember.Handlebars.compile(
  '{{ivy-videojs-source src="assets/small.mp4" type="video/mp4"}}' +
  '{{ivy-videojs-source src="assets/small.webm" type="video/webm"}}'
);

test('should update currentTime property when player currentTime changes', function(assert) {
  var component = this.subject({
    template: template
  });
  this.render();

  return component.awaitLoadedMetadata().then(function() {
    var player = component.get('player');

    assert.equal(component.get('currentTime'), 0);
    player.currentTime(2);
    return component.awaitSeeked();
  }).then(function() {
    assert.equal(component.get('currentTime'), 2);
  });
});

test('should set duration property from player', function(assert) {
  var component = this.subject({
    template: template
  });
  this.render();

  return component.awaitLoadedMetadata().then(function() {
    var player = component.get('player');

    assert.equal(component.get('duration'), player.duration());
  });
});

test('should update volume property when player volume changes', function(assert) {
  var component = this.subject({
    template: template
  });
  this.render();

  return component.awaitReady().then(function() {
    var player = component.get('player');

    player.volume(0.5);
    return component.awaitVolumeChange();
  }).then(function() {
    assert.equal(component.get('volume'), 0.5);
  });
});

function videojsPropertyTest(propertyName, value) {
  test('should update player ' + propertyName + ' when ' + propertyName + ' property changes', function(assert) {
    var component = this.subject({
      template: template
    });
    this.render();

    return component.awaitReady().then(function() {
      var player = component.get('player');
      var method = player[propertyName];

      component.set(propertyName, value);
      assert.equal(method.call(player), value);
    });
  });
}

videojsPropertyTest('autoplay', true);
videojsPropertyTest('controls', true);
videojsPropertyTest('currentTime', 2);
videojsPropertyTest('height', 320);
videojsPropertyTest('loop', true);
videojsPropertyTest('muted', true);
videojsPropertyTest('playbackRate', 1.5);
videojsPropertyTest('poster', 'assets/small.png');
videojsPropertyTest('preload', 'none');
videojsPropertyTest('volume', 0.5);
videojsPropertyTest('width', 560);
