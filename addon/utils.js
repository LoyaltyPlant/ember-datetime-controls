import Ember from 'ember';
import moment from 'moment';

export function getLocaleFirstDayOfWeek(locale) {
  return moment.localeData(locale)._week.dow;
}

export function getLocaleWeekDays(locale) {
  let firstDayOfWeek = getLocaleFirstDayOfWeek(locale),
    weekDays = Ember.A(moment.localeData(locale)._weekdaysMin);
  weekDays.push(weekDays[0]);

  return weekDays.slice(firstDayOfWeek, firstDayOfWeek ? 9 : 7);
}
