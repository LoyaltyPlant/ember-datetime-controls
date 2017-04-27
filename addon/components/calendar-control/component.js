import Ember from 'ember';
import layout from './template';
import moment from 'moment';
import { getLocaleFirstDayOfWeek, getLocaleWeekDays } from 'ember-datetime-controls/utils/locale';
import BasePickerMixin from 'ember-datetime-controls/mixins/base-picker-mixin';

const {
  computed,
  get,
  set,
  setProperties,
  A,
  Component,
  Object
} = Ember;

const WEEK = Object.extend({
  dates: null
});

export default Component.extend(BasePickerMixin, {
  layout,
  classNames: ['dt-calendar'],

  date: null,
  minDate: null,
  maxDate: null,
  disabledDates: null,

  _weekDays: null,
  _month: null,
  _year: null,
  _selectedDate: null,

  monthLabel: computed('_month', function () {
    const locale = get(this, 'locale');

    if (locale !== 'ru') {
      return moment.months(get(this, '_month'));
    } else {
      return moment.tz(get(this, 'timeZone')).locale(locale)._locale._months.standalone[get(this, '_month')];
    }
  }),


  weeks: computed('_month', '_year', 'minDate', 'maxDate', function () {
    const weeks = [],
      month = get(this, '_month'),
      year = get(this, '_year'),
      timeZone = get(this, 'timeZone'),
      firstDayOfWeek = get(this, '_localeFirstDayOfWeek'),
      monthFirstDate = moment.tz([year, month, 1], timeZone),
      daysInMonth = monthFirstDate.daysInMonth(),
      monthLastDate = moment.tz([year, month, daysInMonth], timeZone),
      monthFirstWeekDay = monthFirstDate.day() === 0 && firstDayOfWeek === 1 ? 7 : monthFirstDate.day(),
      currentTimeZoneDate = get(this, 'initialDate'),
      disabledDates = get(this, 'disabledDates') ? get(this, 'disabledDates') : [],
      minDate = get(this, 'minDate') ? moment.tz(get(this, 'minDate'), timeZone).startOf('day') : null,
      maxDate = get(this, 'maxDate') ? moment.tz(get(this, 'maxDate'), timeZone).startOf('day') : null;

    let firstWeek = WEEK.create({ dates: [] }),
      disabledMonthDates = A(),
      currentMonthDate;

    if (currentTimeZoneDate.month() === month) {
      currentMonthDate = currentTimeZoneDate.date();
    }

    disabledDates.forEach((disabledDate) => {
      let disabled = moment(disabledDate).tz(timeZone);
      if (disabled.month() === month) {
        disabledMonthDates.addObject(disabled.date());
      }
    });

    if (minDate && monthFirstDate.isSameOrBefore(minDate)) {
      let daysDiff = Math.abs(monthFirstDate.diff(minDate, 'days'));
      for (let i = 1; i <= daysDiff; i++) {
        disabledMonthDates.addObject(i);
      }
    }

    if (maxDate && monthLastDate.isSameOrAfter(maxDate)) {
      let daysDiff = Math.abs(monthLastDate.diff(maxDate, 'days'));
      for (let i = 0; i < daysDiff; i++) {
        disabledMonthDates.addObject(daysInMonth - i);
      }
    }

    if (firstDayOfWeek !== monthFirstWeekDay) {
      for (let i = firstDayOfWeek; i < monthFirstWeekDay; i++) {
        get(firstWeek, 'dates').push({ index: null });
      }
    }

    let daysInFirstWeek = 0;
    for (let i = monthFirstWeekDay; i <= 6 + firstDayOfWeek; i++) {
      get(firstWeek, 'dates').push({ index: i + 1 - monthFirstWeekDay });
      daysInFirstWeek++;
    }

    weeks.push(firstWeek);

    let week = WEEK.create({ dates: [] }),
      day = 0;

    while (day < daysInMonth - daysInFirstWeek) {
      day++;
      get(week, 'dates').push({ index: day + daysInFirstWeek });

      if (day % 7 === 0) {
        weeks.push(week);
        week = WEEK.create({ dates: [] });
      }
    }
    if (day % 7 !== 0) {
      weeks.push(week);
    }

    weeks.forEach(week => {
      get(week, 'dates').forEach((date, index) => {
        if (date.index === currentMonthDate) {
          date.current = true;
        }

        if (firstDayOfWeek === 1) {
          if ([6, 7].includes(index + 1)) {
            date.weekend = true;
          }
        } else {
          if (index === 0) {
            date.weekend = true;
          }
        }

        if (disabledMonthDates.includes(date.index) || !date.index) {
          date.disabled = true;
        }
      });
    });

    const lastWeek = get(weeks[weeks.length - 1], 'dates');
    const lastWeekLength = lastWeek.length;

    for (let i = 0; i < 7 - lastWeekLength; i++) {
      lastWeek.push({ index: null });
    }

    return weeks;
  }),

  init() {
    this._super(...arguments);
    set(this, '_weekDays', getLocaleWeekDays(get(this, 'locale')));
    set(this, '_localeFirstDayOfWeek', getLocaleFirstDayOfWeek(get(this, 'locale')));

    const weekDays = get(this, '_weekDays');

    if (get(this, '_localeFirstDayOfWeek') === 0) {
      set(this, '_weekDays', weekDays.map((weekDay, index) => {
        let weekDayItem = { weekDay };
        if (index === 0) {
          weekDayItem.weekend = true;
        }
        return weekDayItem;
      }));
    } else {
      set(this, '_weekDays', weekDays.map((weekDay, index) => {
        let weekDayItem = { weekDay };
        if ([6, 7].includes(index + 1)) {
          weekDayItem.weekend = true;
        }
        return weekDayItem;
      }));
    }

  },

  didReceiveAttrs() {
    const initialDate = moment(get(this, 'date') || Date.now())
      .tz(get(this, 'timeZone'));

    set(this, '_month', initialDate.month());
    set(this, '_year', initialDate.year());
    set(this, 'initialDate', initialDate);
  },

  actions: {
    setDate(date) {
      if (date.disabled) {
        return;
      }
      let newDate = { year: get(this, '_year'), month: get(this, '_month'), date: date.index };
      this.resetCurrentDate();
      set(this, '_selectedDate', date);
      this.attrs.onDateUpdated(newDate);
    },

    previousMonth() {
      let yearMonth = moment.tz([get(this, '_year'), get(this, '_month')], get(this, 'timeZone')).subtract(1, 'months');
      setProperties(this, {
        _year: yearMonth.year(),
        _month: yearMonth.month()
      });
    },

    nextMonth() {
      let yearMonth = moment.tz([get(this, '_year'), get(this, '_month')], get(this, 'timeZone')).add(1, 'months');
      setProperties(this, {
        _year: yearMonth.year(),
        _month: yearMonth.month()
      });
    }
  },


  resetCurrentDate() {
    const weeks = get(this, 'weeks');

    weeks.forEach((week) => {
      get(week, 'dates').forEach((date) => {
        if (date.current) {
          set(date, 'current', false);
        }
      })
    });
  },

  resetTimeFromDate() {

  }
});
