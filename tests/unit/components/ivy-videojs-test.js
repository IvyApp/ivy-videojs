import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ivy-videojs', 'Unit | Component | ivy-videojs', {
  unit: true
});

test('should not attempt to autoresize a destroyed component', function(assert) {
  var component = this.subject({
    autoresize: true
  });
  this.render();

  Ember.run(component, 'destroy');
  assert.ok(true, 'no exception was thrown');
});
