import Ember from 'ember';
import BasePickerMixinMixin from 'ember-datetime-controls/mixins/base-picker-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | base picker mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let BasePickerMixinObject = Ember.Object.extend(BasePickerMixinMixin);
  let subject = BasePickerMixinObject.create();
  assert.ok(subject);
});
