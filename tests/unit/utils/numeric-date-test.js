import numericDate from "dummy/utils/numeric-date";
import {module, test} from "qunit";

module('Unit | Utility | numeric-date');

// Replace this with your real tests.
test('constructors', function (assert) {
  assert.ok(numericDate());
  assert.deepEqual(numericDate([2016, 7, 7]), 20160807000000);
  assert.deepEqual(numericDate([2016, 11, 31, 0, 10, 10]), 20161231001010);
});
