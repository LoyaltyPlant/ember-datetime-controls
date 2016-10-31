import Ember from 'ember';
import { MAX_MINUTES, MAX_HOURS } from 'ember-datetime-controls/utils/constants';
import moment from 'moment';
import BaseControl from './control';

const {
  get,
  set,
  computed
} = Ember;


//TODO: Перенести disabled в шаблон
export default BaseControl.extend({
  classNames: ['dt-control__time-list'],
  _minTime: computed('minDate', function () {
    const minTime = get(this, 'minTime');
    const minDate = get(this, 'minDate');
    const minDatetime = (minDate) ? this._getDatetime(get(this, 'minDate'), 'HH:mm') : minTime;
    return (minTime > minDatetime) ? minTime : minDatetime;
  }),
  _maxTime: computed('maxDate', function () {
    const maxTime = get(this, 'maxTime');
    const maxDate = get(this, 'maxDate');
    const maxDatetime = (maxDate) ? this._getDatetime(get(this, 'maxDate'), 'HH:mm') : maxTime;
    return (maxTime > maxDatetime) ? maxTime : maxDatetime;
  }),
  _minHourTime: computed('_minTime', function () {
    const minTime = get(this, '_minTime');
    return (minTime) ? +minTime.split(':')[0] : null;
  }),
  _minMinuteTime: computed('_minTime', function () {
    const minTime = get(this, '_minTime');
    return (minTime) ? +minTime.split(':')[1] : null;
  }),
  _maxHourTime: computed('_maxTime', function () {
    const maxTime = get(this, '_maxTime');
    return (maxTime) ? +maxTime.split(':')[0] : MAX_HOURS + 1;
  }),
  _maxMinuteTime: computed('_maxTime', function () {
    const maxTime = get(this, '_maxTime');
    return (maxTime) ? +maxTime.split(':')[1] : MAX_MINUTES + 1;
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

  _getDatetime(date, format) {
    return moment(date)
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
    if ( timeString > get(this, '_maxTime') ) {
      this._setTime({
        hour: get(this, '_maxHourTime'),
        minute: get(this, '_maxMinuteTime')
      });
      return false;
    } else if ( timeString < get(this, '_minTime') ) {
      this._setTime({
        hour: get(this, '_minHourTime'),
        minute: get(this, '_minMinuteTime')
      });
      return false;
    }
    return true;
  },
  _isDisabledMinute(timeString) {
    return ( timeString > get(this, '_maxTime') || timeString < get(this, '_minTime'));
  },
  _isDisabledHour(hour) {
    return (hour > get(this, '_maxHourTime') || hour < get(this, '_minHourTime'));
  },
  init() {
    this._super(...arguments);
  }
});
