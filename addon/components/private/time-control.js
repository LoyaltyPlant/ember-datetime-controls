import Ember from 'ember';
import layout from 'ember-datetime-controls/templates/components/private/time-control';
import { MINUTES, HOURS, MERIDIEM } from 'ember-datetime-controls/utils/constants';
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
    let hourValue = 0;
    if (get(this, 'isAmPmTimezone')) {
      const meridiems = {1: 'am', 2: 'pm'};
      for (let i = 1; i <= 2; i++) {
        let hourItem = {title: `${MERIDIEM} ${meridiems[i]}`, value: hourValue};
        if ( this._isDisabledHour(hourValue) ) {
          hourItem.disabled = true;
        }
        hours.push(hourItem);
        hourValue++;
        for (let hour = 1; hour < MERIDIEM; hour++) {
          let hourItem = { title: `${this._formatTime(hour)} ${meridiems[i]}`, value: hourValue };
          if ( this._isDisabledHour(hourValue) ) {
            hourItem.disabled = true;
          }
          hours.push(hourItem);
          hourValue++;
        }
      }
    } else {
      for (let hour = 0; hour < HOURS; hour++) {
        const hourItem = {title: this._formatTime(hour), value: hour};
        if ( this._isDisabledHour(hour) ) {
          hourItem.disabled = true;
        }
        hours.push(hourItem);
      }
    }

    return hours;
  }),
  currentHours: computed('date', function () {
    const format = (get(this, 'isAmPmTimezone')) ? 'hh' : 'HH';
    return this._getTime(format);
  }),
  minutes: computed('date', function () {
    let minutes = A();
    for (let minute = 0; minute < MINUTES; minute += 5) {
      const minuteItem = { title: this._formatTime(minute), value: minute };
      const possibleTime = `${this._getTime('HH')}:${minuteItem.title}`;

      if ( this._isDisabledMinute(possibleTime) ) {
        minuteItem.disabled = true;
      }

      minutes.push(minuteItem);
    }
    return minutes;
  }),
  currentMinute: computed('date', function () {
    return this._getTime('mm');
  }),
  meridiem: computed('date', function () {
    if (get(this, 'isAmPmTimezone')) {
      return this._getTime('a');
    }
  }),

  _minHourTime: computed('minTime', function () {
    const minTime = get(this, 'minTime');
    return (minTime) ? +minTime.split(':')[0] : null;
  }),
  _minMinuteTime: computed('minTime', function () {
    const minTime = get(this, 'minTime');
    return (minTime) ? +minTime.split(':')[1] : null;
  }),
  _maxHourTime: computed('maxTime', function () {
    const maxTime = get(this, 'maxTime');
    return (maxTime) ? +maxTime.split(':')[0] : HOURS + 1;
  }),
  _maxMinuteTime: computed('maxTime', function () {
    const maxTime = get(this, 'maxTime');
    return (maxTime) ? +maxTime.split(':')[1] : MINUTES + 1;
  }),

  _formatTime(time) {
    return `0${time}`.slice(-2);
  },
  _getTime(format) {
    return moment(this.get('date'))
      .tz(this.get('timeZone'))
      .locale(this.get('locale'))
      .format(format);
  },
  _setTime(newTime) {
    set(this, 'date', moment(get(this, 'date'))
      .tz(get(this, 'timeZone'))
      .set(newTime)
      .toDate());
  },
  _checkTimeLimit (timeString) {
    if ( timeString > get(this, 'maxTime') ) {
      this._setTime({
        hour: get(this, '_maxHourTime'),
        minute: get(this, '_maxMinuteTime')
      });
      return false;
    } else if ( timeString < get(this, 'minTime') ) {
      this._setTime({
        hour: get(this, '_minHourTime'),
        minute: get(this, '_minMinuteTime')
      });
      return false;
    }
    return true;
  },
  _isDisabledMinute(timeString) {
    return ( timeString > get(this, 'maxTime') || timeString < get(this, 'minTime'));
  },
  _isDisabledHour(hour) {
    return (hour > get(this, '_maxHourTime') || hour < get(this, '_minHourTime'));
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
      const minute = this._getTime('mm');
      const newTimeString = `${this._formatTime(value)}:${minute}`;

      if ( disabled ) {
        return false;
      }

      if ( this._checkTimeLimit(newTimeString) ) {
        this._setTime({hour: value});
      }

      this.send('hideHourPicker');

    },
    selectMinute({ value, disabled }) {

      const hour = this._getTime('HH');
      const newTimeString = `${hour}:${this._formatTime(value)}`;

      if ( disabled ) {
        return false;
      }

      if ( this._checkTimeLimit(newTimeString) ) {
        this._setTime({minute: value});
      }

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
