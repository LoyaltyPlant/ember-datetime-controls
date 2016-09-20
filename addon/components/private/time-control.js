import Ember from 'ember';
import layout from 'ember-datetime-controls/templates/components/private/time-control';
import moment from 'moment';

const {
  get,
  set,
  computed,
  A,
  $
} = Ember;

export default Ember.Component.extend({
  layout,
  tagName: '',
  hours: computed(function () {
    const hours = A();
    if (get(this, 'isAmPmTimezone')) {
      const meridiems = {1: 'am', 2: 'pm'};
      for (let i = 1; i <= 2; i++) {
        hours.push(`12 ${meridiems[i]}`);
        for (let hour = 1; hour <= 11; hour++) {
          hours.push({ value: `${this._formatTime(hour)} ${meridiems[i]}` });
        }
      }
    } else {
      for (let hour = 0; hour < 24; hour++) {
        const hourItem = {value: this._formatTime(hour)};
        if ( hour > get(this, '_maxHourTime') || hour < get(this, '_minHourTime')) {
          hourItem.disabled = true;
        }
        hours.push(hourItem);
      }
    }

    console.log(get(this, '_minHourTime'));
    console.log(get(this, '_maxHourTime'));

    return hours;
  }),
  currentHours: computed('date', function () {
    const format = (get(this, 'isAmPmTimezone')) ? 'hh' : 'HH';
    return this.getTime(format);
  }),
  minutes: computed('date', function () {
    let minutes = A();
    for (let minute = 0; minute < 60; minute += 5) {
      const minuteItem = { value: this._formatTime(minute) };
      const possibleTime = `${this.getTime('HH')}:${minuteItem.value}`;

      if ( possibleTime > this.get('maxTime') || possibleTime < this.get('minTime')) {
        minuteItem.disabled = true;
      }

      minutes.push(minuteItem);
    }
    return minutes;
  }),
  currentMinute: computed('date', function () {
    return this.getTime('mm');
  }),
  meridiem: computed('date', function () {
    if (get(this, 'isAmPmTimezone')) {
      return this.getTime('a');
    }
  }),

  _minHourTime: computed('minTime', function () {
    const minTime = get(this, 'minTime');
    return (minTime) ? +minTime.split(':')[0] : null;
  }),
  _minMinuteTime: computed('minTime', function () {

  }),
  _maxHourTime: computed('maxTime', function () {
    const maxTime = get(this, 'maxTime');
    return (maxTime) ? +maxTime.split(':')[0] : null;
  }),
  _maxMinuteTime: computed('maxTime', function () {

  }),

  _formatTime(time) {
    return `0${time}`.slice(-2);
  },
  getTime(format) {
    return moment(this.get('date'))
      .tz(this.get('timeZone'))
      .locale(this.get('locale'))
      .format(format);
  },
  actions: {
    showMinutePicker() {
      set(this, 'isShowMinutePicker', true);
      this.send('hideHourPicker');
    },
    hideMinutePicker () {
      set(this, 'isShowMinutePicker', false);
    },
    showHourPicker () {
      set(this, 'isShowHourPicker', true);
      this.send('hideMinutePicker');

    },
    hideHourPicker () {
      set(this, 'isShowHourPicker', false);
    },
    hideAllPickers() {
      this.send('hideHourPicker');
      this.send('hideMinutePicker');
      return false;

    },
    selectHour({ value, disabled }) {
      if ( disabled ) {
        return false;
      }
      let _hour;
      if (get(this, 'isAmPmTimezone')) {
        const meridiem = value.replace(/[^a-z]+/g, '');
        _hour = +value.replace(/[^0-9]+/g, '');
        if (meridiem === 'am' && _hour === 12) {
          _hour = 0;
        } else if ( meridiem === 'pm' && _hour < 12 ) {
          _hour += 12;
        }
      } else {
        _hour = +value;
      }
      set(this, 'date', moment(get(this, 'date'))
        .tz(get(this, 'timeZone'))
        .set('hour', _hour)
        .toDate());

      this.send('hideHourPicker');

    },
    selectMinute({ value, disabled }) {
      if ( disabled ) {
        return false;
      }
      const hour = this.getTime('HH');
      if ( `${hour}:${value}` > get(this, 'maxTime') ) {

      }
      set(this, 'date', moment(get(this, 'date'))
        .tz(get(this, 'timeZone'))
        .set('minute', value)
        .toDate());

      this.send('hideMinutePicker');

    }
  },
  init() {
    this._super(...arguments);
    const self = this;
    $('html, body').click(() => {
      self.send('hideAllPickers');
    });
  },
  willDestroyElement() {
    $('html, body').unbind();
  }
});
