import Ember from 'ember';
import { MAX_MINUTES } from 'ember-datetime-controls/utils/constants';
import TimeControl from './time-control';
import layout from '../../templates/components/private/minute-picker';

const {
  get,
  set,
  computed,
  A
} = Ember;

export default TimeControl.extend({
  layout,
  minutes: computed('date', '_minDate', '_maxDate', function () {
    let minutes = A();
    const hour = this._getTime('HH');
    for (let minute = 0; minute < MAX_MINUTES; minute += 5) {
      const minuteItem = { title: this._formatTime(minute), value: minute };
      const possibleTime = `${hour}:${minuteItem.title}`;

      if ( this._isDisabledMinute(possibleTime) ) {
        minuteItem.disabled = true;
      }

      minutes.push(minuteItem);
    }
    return minutes;
  }),
  actions: {
    selectMinute({ value, disabled }) {
      const hour = this._getTime('HH');
      const newTimeString = `${hour}:${this._formatTime(value)}`;

      if ( disabled ) {
        return false;
      }

      if ( this._checkTimeLimit(newTimeString) ) {
        this._setTime({minute: value});
      }

      this.sendAction('hide');

      if ( this.get('onTimeChange') ) {
        this.get('onTimeChange')(this.get('date'));
      }

    }
  }
});
