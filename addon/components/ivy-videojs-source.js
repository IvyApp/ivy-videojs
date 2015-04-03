import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'source',
  attributeBindings: ['src', 'type']
});
