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

test('should update muted on volumeChange', function(assert) {
  var component = this.subject({
    template: template
  });
  this.render();

  return component.ready().then(function(player) {
    player.muted(true);

    return awaitEvent(component, 'volumeChange').then(function() {
      assert.equal(component.get('muted'), true);
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

test('should fill its parent container when autoresize is true', function(assert) {
  var component = this.subject({
    autoresize: true,
    naturalHeight: 320,
    naturalWidth: 560,
    template: template
  });
  this.render();

  return component.ready().then(function(player) {
    // Since videojs wraps our component in a div, we actually want to grab the
    // grandparent of the component here.
    var parent = component.$().parent().parent();

    assert.equal(component.get('currentWidth'), parent.width());
  });
});

function videojsPropertyTest(property, attrName, value) {
  test('should bind ' + property + ' property to player ' + attrName + ' attribute', function(assert) {
    var props = { template: template };
    props[property] = value;
    var component = this.subject(props);
    this.render();

    return component.ready().then(function(player) {
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
