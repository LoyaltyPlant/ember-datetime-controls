import Ember from "ember";
import PickerStateBusMixinMixin from "ember-datetime-controls/mixins/picker-state-bus-mixin";
import {module, test} from "qunit";

module('Unit | Mixin | picker state bus mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let PickerStateBusMixinObject = Ember.Object.extend(PickerStateBusMixinMixin);
  let subject = PickerStateBusMixinObject.create();
  assert.ok(subject);
});
