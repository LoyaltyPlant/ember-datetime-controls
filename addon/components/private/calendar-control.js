import Ember from 'ember';
import moment from 'moment';
import {getLocaleFirstDayOfWeek, getLocaleWeekDays} from 'ember-datetime-controls/utils';
import layout from 'ember-datetime-controls/templates/components/private/calendar-control';

const WEEK = Ember.Object.extend({
  days: null
});

export default Ember.Component.extend({
  layout,

  locale: null,
  date: null,
  weekDays: null,

  _month: null,
  _year: null,

  init() {
    this._super(...arguments);
    this.set('weekDays', getLocaleWeekDays(this.get('locale')));
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
    let weeks = [],
      month = this.get('_month'),
      year = this.get('_year'),
      firstDayOfWeek = getLocaleFirstDayOfWeek(this.get('locale')),
      daysInMonth = moment({year, month: month}).daysInMonth(),
      firstWeek = WEEK.create({days: []}),
      monthFirstWeekDay = moment([this.get('_year'), this.get('_month'), 1]).day();

    if (monthFirstWeekDay === 0 && firstDayOfWeek === 1) {
      monthFirstWeekDay = 7;
    }

    if (firstDayOfWeek !== monthFirstWeekDay) {
      for (let i = firstDayOfWeek; i < monthFirstWeekDay; i++) {
        firstWeek.get('days').push(null);
      }
    }

    let daysInFirstWeek = 0;
    for (let i = monthFirstWeekDay; i <= 6 + firstDayOfWeek; i++) {
      firstWeek.get('days').push(i + 1 - monthFirstWeekDay);
      daysInFirstWeek++;
    }

    weeks.push(firstWeek);

    let week = WEEK.create({days: []}),
      day = 0;

    while(day < daysInMonth - daysInFirstWeek) {
      day++;
      week.get('days').push(day + daysInFirstWeek);

      if (day % 7 === 0) {
        weeks.push(week);
        week = WEEK.create({days: []});
      }
    }
    if (day % 7 !== 0 ) {
      weeks.push(week);
    }
    return weeks;
  }),

  actions: {
    setDate(date) {
      let newDate = {year: this.get('_year'), month: this.get('_month'), date: date};
      this.attrs.onDateUpdated(newDate);
    },
    previousMonth() {
      let yearMonth = moment(`${this.get('_year')}-${this.get('_month')+1}`, "YYYY-MM").subtract(1, 'months');
      this.setProperties({
        _year: yearMonth.year(),
        _month: yearMonth.month()
      });
    },
    nextMonth() {
      let yearMonth = moment(`${this.get('_year')}-${this.get('_month')+1}`, "YYYY-MM").add(1, 'months');
      this.setProperties({
        _year: yearMonth.year(),
        _month: yearMonth.month()
      });
    }
  }

});
