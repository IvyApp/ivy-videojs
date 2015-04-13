import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ivy-videojs', 'unit/components/ivy-videojs', {
  needs: ['component:ivy-videojs-source']
});

var template = Ember.Handlebars.compile(
  '{{ivy-videojs-source src="assets/small.mp4" type="video/mp4"}}' +
  '{{ivy-videojs-source src="assets/small.webm" type="video/webm"}}'
);

function awaitEvent(component, eventName) {
  return new Ember.RSVP.Promise(function(resolve) {
    component.one(eventName, resolve);
  });
}

test('should update currentTime on seeked', function(assert) {
  var component = this.subject({
    template: template
  });
  this.render();

  return component.ready().then(function(player) {
    return awaitEvent(component, 'loadedMetadata').then(function() {
      player.currentTime(2);

      return awaitEvent(component, 'seeked');
    }).then(function() {
      assert.equal(component.get('currentTime'), 2);
    });
  });
});

test('should update currentTime on timeUpdate', function(assert) {
  var component = this.subject({
    template: template
  });
  this.render();

  return component.ready().then(function(player) {
    return awaitEvent(component, 'loadedMetadata').then(function() {
      player.play();

      return awaitEvent(component, 'play');
    }).then(function() {
      return awaitEvent(component, 'timeUpdate');
    }).then(function() {
      assert.notEqual(component.get('currentTime'), 0);
    });
  });
});

test('should update duration on durationChange', function(assert) {
  var component = this.subject({
    template: template
  });
  this.render();

  return component.ready().then(function(player) {
    return awaitEvent(component, 'durationChange').then(function() {
      assert.notEqual(component.get('duration'), 0);
    });
  });
});

test('should update volume on volumeChange', function(assert) {
  var component = this.subject({
    template: template
  });
  this.render();

  return component.ready().then(function(player) {
    player.volume(0.5);

    return awaitEvent(component, 'volumeChange').then(function() {
      assert.equal(component.get('volume'), 0.5);
    });
  });
});

function videojsPropertyTest(propertyName, value) {
  test('should bind ' + propertyName + ' property to player ' + propertyName, function(assert) {
    var props = { template: template };
    props[propertyName] = value;
    var component = this.subject(props);
    this.render();

    return component.ready().then(function(player) {
      assert.equal(player[propertyName](), value);
    });
  });
}

videojsPropertyTest('autoplay', true);
videojsPropertyTest('controls', true);
videojsPropertyTest('height', 320);
videojsPropertyTest('loop', true);
videojsPropertyTest('muted', true);
videojsPropertyTest('playbackRate', 1.5);
videojsPropertyTest('poster', 'assets/small.png');
videojsPropertyTest('preload', 'none');
videojsPropertyTest('volume', 0.5);
videojsPropertyTest('width', 560);
