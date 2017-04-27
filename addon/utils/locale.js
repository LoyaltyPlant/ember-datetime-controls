import Ember from 'ember';
import moment from 'moment';

const {
  A
} = Ember;

export function getLocaleFirstDayOfWeek(locale) {
  return moment.localeData(locale)._week.dow;
}

export function getLocaleWeekDays(locale) {
  const firstDayOfWeek = getLocaleFirstDayOfWeek(locale);
  const weekDays = A(moment.localeData(locale)._weekdaysMin);

  weekDays.push(weekDays[0]);

  return weekDays.slice(firstDayOfWeek, firstDayOfWeek ? 8 : 7);
}

export function isAmPm(locale) {
  return !!moment()
    .locale(locale)
    .format('LT')
    .match(/(AM|PM)/g);
}

export default {
  getLocaleFirstDayOfWeek,
  getLocaleWeekDays,
  isAmPm
};
