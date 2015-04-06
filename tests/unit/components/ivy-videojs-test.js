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

test('should update player currentTime when currentTime property changes', function(assert) {
  var component = this.subject({
    template: template
  });
  this.render();

  return awaitEvent(component, 'loadedmetadata').then(function() {
    component.set('currentTime', 2);
    assert.equal(component.get('player').currentTime(), 2);
  });
});

test('should update currentTime property when player currentTime changes', function(assert) {
  var component = this.subject({
    template: template
  });
  this.render();

  return awaitEvent(component, 'loadedmetadata').then(function() {
    component.get('player').currentTime(2);

    return awaitEvent(component, 'seeked');
  }).then(function() {
    assert.equal(component.get('currentTime'), 2);
  });
});

test('should set duration property from player', function(assert) {
  var component = this.subject({
    template: template
  });
  this.render();

  return awaitEvent(component, 'loadedmetadata').then(function() {
    assert.equal(component.get('duration'), component.get('player').duration());
  });
});

test('should update volume property when player volume changes', function(assert) {
  var component = this.subject({
    template: template
  });
  this.render();

  component.get('player').volume(0.5);

  return awaitEvent(component, 'volumechange').then(function() {
    assert.equal(component.get('volume'), 0.5);
  });
});

function videojsPropertyTest(propertyName, value) {
  test('should update player ' + propertyName + ' when ' + propertyName + ' property changes', function(assert) {
    var component = this.subject({
      template: template
    });
    this.render();

    var player = component.get('player');
    var method = player[propertyName];

    component.set(propertyName, value);
    assert.equal(method.call(player), value);
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
