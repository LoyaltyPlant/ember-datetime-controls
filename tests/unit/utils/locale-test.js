import locale from "dummy/utils/locale";
import {module, test} from "qunit";

module('Unit | Utility | locale');

// Replace this with your real tests.
test('it works', function(assert) {
  const ruLocaleFirstDOW = locale.getLocaleFirstDayOfWeek("ru");
  const enLocaleFirstDOW = locale.getLocaleFirstDayOfWeek("en-US");
  assert.equal(ruLocaleFirstDOW, 1, 'Monday is first day of week in ru locale');
  assert.equal(enLocaleFirstDOW, 0, 'Sunday is first day of week in en locale');
});
