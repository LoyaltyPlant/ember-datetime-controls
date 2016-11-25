import Ember from 'ember';
import layout from 'ember-datetime-controls/templates/components/private/hour-picker';
import { MAX_HOURS, MERIDIEM } from 'ember-datetime-controls/utils/constants';
import TimeControl from './time-control';

const {
  get,
  computed,
  A
} = Ember;

export default TimeControl.extend({
  layout,
  hours: computed('_minTime', '_maxTime', function () {
    const hours = A();
    let hourValue = 0;
    if (get(this, 'isAmPm')) {
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
      for (let hour = 0; hour < MAX_HOURS; hour++) {
        const hourItem = {title: this._formatTime(hour), value: hour};
        if ( this._isDisabledHour(hour) ) {
          hourItem.disabled = true;
        }
        hours.push(hourItem);
      }
    }

    return hours;
  }),
  
  actions: {
    selectHour({ value, disabled }) {
      const minute = this._getTime('mm');
      const newTimeString = `${this._formatTime(value)}:${minute}`;

      if ( disabled ) {
        return false;
      }

      if ( this._checkTimeLimit(newTimeString) ) {
        this._setTime({hour: value});
      }

      this.sendAction('hide');

      if ( this.get('onTimeChange') ) {
        this.get('onTimeChange')(this.get('date'));
      }

    }
  }
});

