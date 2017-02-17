import Ember from 'ember';
import PickerPositioningMixinMixin from 'ember-datetime-controls/mixins/picker-positioning-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | picker positioning mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let PickerPositioningMixinObject = Ember.Object.extend(PickerPositioningMixinMixin);
  let subject = PickerPositioningMixinObject.create();
  assert.ok(subject);
});
