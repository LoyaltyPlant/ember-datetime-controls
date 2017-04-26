import Ember from "ember";
import layout from "./template";
import moment from "moment";
import BasePickerMixin from "ember-datetime-controls/mixins/base-picker-mixin";

const {
  Component,
  get,
  set,
  computed
} = Ember;

export default Component.extend(BasePickerMixin, {
  layout,
  classNames: ['dt-pickers'],

  // passed in
  date: null,
  minDate: null,
  maxDate: null,
  disabledDates: null,
  format: null,

  time: 'hh:mm',

  isTimePickerDisabled: computed('date', {
    get() {
      const date = get(this, 'date');

      if (date && date instanceof Date) {
        set(this, 'time', this._getTimeZoneDate(date).format('HH:mm'));
        return false;
      } else {
        set(this, 'time', 'hh:mm');
        this.send('onTimeChange', get(this, 'time'));
        return true;
      }
    }
  }),

  _getTimeZoneDate(date) {
    return moment(date)
      .tz(get(this, 'timeZone'))
      .locale(get(this, 'locale'));
  },

  actions: {
    onTimeChange(time = '00:00') {
      const onChange = get(this, 'onChange');
      const date = get(this, 'date');
      const [hour, minute] = time.split(':');
      let newDateTime;

      if (hour !== 'hh' && minute !== 'mm') {
        newDateTime = this._getTimeZoneDate(date)
          .set({ hour, minute, second: 0 })
          .toDate();
      } else {
        newDateTime = this._getTimeZoneDate(date)
          .set({ hour: 0, minute: 0, second: 0 })
          .toDate();
      }

      if (date && date instanceof Date) {
        set(this, 'date', newDateTime);
      } else {
        return;
      }

      if (onChange && onChange instanceof Function) {
        onChange(newDateTime);
      }

    },

    onDateChange(date) {
      set(this, 'date', date);
      this.send('onTimeChange', get(this, 'time'));
    }
  }
});
