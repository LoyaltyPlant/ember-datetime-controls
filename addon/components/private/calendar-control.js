import Ember from "ember";
import moment from "moment";
import {getLocaleFirstDayOfWeek, getLocaleWeekDays} from "ember-datetime-controls/utils";
import layout from "ember-datetime-controls/templates/components/private/calendar-control";

const WEEK = Ember.Object.extend({
  dates: null
});

export default Ember.Component.extend({
  layout,

  locale: null,
  date: null,
  minDate: null,
  maxDate: null,

  _weekDays: null,

  _month: null,
  _year: null,
  _selectedDate: null,

  init() {
    this._super(...arguments);
    this.set('_weekDays', getLocaleWeekDays(this.get('locale')));
  },

  didReceiveAttrs() {
    let initialDate = moment(this.get('date')).tz(this.get('timeZone'));
    this.set('_month', initialDate.month());
    this.set('_year', initialDate.year());
  },

  monthLabel: Ember.computed('_month', function () {
    return moment.months(this.get('_month'));
  }),

  weeks: Ember.computed('_month', '_year', function () {
    console.time('getting weeks');
    let weeks = [],
      month = this.get('_month'),
      year = this.get('_year'),
      firstDayOfWeek = getLocaleFirstDayOfWeek(this.get('locale')),
      daysInMonth = moment({year, month: month}).daysInMonth(),
      firstWeek = WEEK.create({dates: []}),
      monthFirstWeekDay = moment.tz([this.get('_year'), this.get('_month'), 1], this.get('timeZone')).day(),
      disabledMonthDates = Ember.A(),
      currentMonthDate;

    if (moment().tz(this.get('timeZone')).isSame(moment.tz([this.get('_year'), this.get('_month'), 1], this.get('timeZone')), 'month')) {
      currentMonthDate = moment().tz(this.get('timeZone')).date();
    }

    if (moment.tz([this.get('_year'), this.get('_month'), 1], this.get('timeZone')).isSameOrBefore(moment.tz(this.get('minDate'), this.get('timeZone')))) {
      let daysDiff = Math.abs(moment.tz([this.get('_year'), this.get('_month'), 1], this.get('timeZone')).diff(moment.tz(this.get('minDate'), this.get('timeZone')), 'days'));
      for (let i = 1; i <= daysDiff; i++) {
        disabledMonthDates.addObject(i);
      }
    }

    if (moment.tz([this.get('_year'), this.get('_month'), daysInMonth], this.get('timeZone')).isSameOrAfter(moment.tz(this.get('maxDate'), this.get('timeZone')))) {
      let daysDiff = Math.abs(moment.tz([this.get('_year'), this.get('_month'), daysInMonth], this.get('timeZone')).diff(moment.tz(this.get('maxDate'), this.get('timeZone')), 'days'));
      for (let i = 0; i < daysDiff; i++) {
        disabledMonthDates.addObject(daysInMonth - i);
      }
    }

    if (monthFirstWeekDay === 0 && firstDayOfWeek === 1) {
      monthFirstWeekDay = 7;
    }

    if (firstDayOfWeek !== monthFirstWeekDay) {
      for (let i = firstDayOfWeek; i < monthFirstWeekDay; i++) {
        firstWeek.get('dates').push({index: null});
      }
    }

    let daysInFirstWeek = 0;
    for (let i = monthFirstWeekDay; i <= 6 + firstDayOfWeek; i++) {
      firstWeek.get('dates').push({index: i + 1 - monthFirstWeekDay});
      daysInFirstWeek++;
    }

    weeks.push(firstWeek);

    let week = WEEK.create({dates: []}),
      day = 0;

    while (day < daysInMonth - daysInFirstWeek) {
      day++;
      week.get('dates').push({index: day + daysInFirstWeek});

      if (day % 7 === 0) {
        weeks.push(week);
        week = WEEK.create({dates: []});
      }
    }
    if (day % 7 !== 0) {
      weeks.push(week);
    }

    weeks.forEach(week => {
      week.get('dates').forEach(date => {
        if (date.index === currentMonthDate) {
          date.current = true;
        }
        if (disabledMonthDates.contains(date.index)) {
          date.disabled = true;
        }
      });
    });

    console.timeEnd('getting weeks');
    return weeks;
  }),

  actions: {
    setDate(date) {
      if (date.disabled) {
        return;
      }
      let newDate = {year: this.get('_year'), month: this.get('_month'), date: date.index};
      Ember.set(this, '_selectedDate', date);
      this.attrs.onDateUpdated(newDate);
    },
    previousMonth() {
      let yearMonth = moment.tz([this.get('_year'), this.get('_month')], this.get('timeZone')).subtract(1, 'months');
      this.setProperties({
        _year: yearMonth.year(),
        _month: yearMonth.month()
      });
    },
    nextMonth() {
      let yearMonth = moment.tz([this.get('_year'), this.get('_month')], this.get('timeZone')).add(1, 'months');
      this.setProperties({
        _year: yearMonth.year(),
        _month: yearMonth.month()
      });
    }
  }

});
