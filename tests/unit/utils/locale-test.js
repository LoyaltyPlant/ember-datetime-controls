import locale from "dummy/utils/locale";
import {module, test} from "qunit";

module('Unit | Utility | locale');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = locale.getLocaleFirstDayOfWeek("en");
  assert.equal(result, 1, 'Monday is first day of week in ru locale');
  assert.equal(result, 0, 'Sunday is first day of week in en locale');
});
