import CalendarMonthView from "dummy/utils/calendar-view";
import {module, test} from "qunit";

module('Unit | Utility | CalendarMonthView');

function checkWeeksLengths(assert, weeks) {
  assert.ok(weeks.length >= 4);
  assert.ok(weeks.length <= 6);

  for (let i = 0; i < weeks.length; i++) {
    assert.ok(weeks[i].dates.length > 0);
    assert.ok(weeks[i].dates.length <= 7);
  }
}

// Replace this with your real tests.
test('Calendar January 2016 Europe/Moscow', function(assert) {
  let moscowJanuary = new CalendarMonthView(2016, 0, "Europe/Moscow", "ru", null, null, null);
  assert.equal(moscowJanuary.localeInfo.startWeekDay, 1);
  assert.equal(moscowJanuary.monthInfo.daysInMonth, 31);
  assert.equal(moscowJanuary.monthInfo.monthFirstWeekDay, 5);
  assert.equal(moscowJanuary.weeks[0].dates[4], 1);
  assert.equal(moscowJanuary.weeks[1].dates[0], 4);
  assert.equal(moscowJanuary.weeks[1].dates[6], 10);
  assert.equal(moscowJanuary.weeks[4].dates[6], 31);
  assert.equal(moscowJanuary.weeks.length, 5);
  checkWeeksLengths(assert, moscowJanuary.weeks);
});

test('Calendar May 2016 Europe/Moscow', function(assert) {
  let moscowMay2016 = new CalendarMonthView(2016, 4, "Europe/Moscow", "ru", null, null, null);
  assert.equal(moscowMay2016.monthInfo.month, 4);
  assert.equal(moscowMay2016.monthInfo.daysInMonth, 31);
  assert.equal(moscowMay2016.monthInfo.monthFirstWeekDay, 0);
  assert.equal(moscowMay2016.weeks[0].dates[0], -5);
  assert.equal(moscowMay2016.weeks[4].dates[6], 29);
  assert.equal(moscowMay2016.weeks.length, 6, "Check there is 6 weeks in May 2016, Europe/Moscow");
  checkWeeksLengths(assert, moscowMay2016.weeks);
});

test('Calendar January 2016 America/New_York', function(assert) {
  let newYorkJanuary = new CalendarMonthView(2016, 0, "America/New_York", "en", null, null, null);
  assert.equal(newYorkJanuary.localeInfo.startWeekDay, 0);
  assert.equal(newYorkJanuary.monthInfo.daysInMonth, 31);
  assert.equal(newYorkJanuary.monthInfo.monthFirstWeekDay, 5);
  checkWeeksLengths(assert, newYorkJanuary.weeks);
});
