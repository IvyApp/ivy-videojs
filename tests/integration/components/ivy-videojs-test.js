import { compileTemplate as compile } from '@ember/template-compilation';
import { run } from '@ember/runloop';
import { Promise } from 'rsvp';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ivy-videojs', 'Integration | Component | ivy-videojs', {
  integration: true
});

test('it sends a "ready" action when the player is ready', function(assert) {
  assert.expect(1);

  return new Promise((resolve) => {
    this.on('ready', function() {
      assert.ok('"ready" action was sent');
      resolve();
    });

    this.render(hbs`{{ivy-videojs ready="ready"}}`);
  });
});

function propertyBindingTests(property, exampleValue) {
  test(`it binds the "${property}" property to the player`, function(assert) {
    assert.expect(1);

    return new Promise((resolve) => {
      this.on('ready', (player) => {
        run(this, function() { this.set(property, exampleValue); });
        assert.equal(player[property](), exampleValue);

        resolve();
      });

      this.render(compile(`{{ivy-videojs ${property}=${property} ready="ready"}}`));
    });
  });
}

propertyBindingTests('controls', true);
propertyBindingTests('fluid', true);
propertyBindingTests('language', 'es');
propertyBindingTests('loop', true);
propertyBindingTests('muted', true);
propertyBindingTests('playbackRate', 1.5);
propertyBindingTests('poster', 'assets/small.png');
propertyBindingTests('volume', 0.5);
