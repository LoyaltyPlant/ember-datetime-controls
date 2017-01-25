import Ember from "ember";
import layout from "./template";
import moment from "moment";
import BasePickerMixin from "ember-datetime-controls/mixins/base-picker-mixin";

const {
  Component,
  get,
  set
} = Ember;

export default Component.extend(BasePickerMixin, {
  layout,
  classNames: ['dt-pickers'],

  didReceiveAttrs() {
    this._super(...arguments);
    const date = get(this, 'date');

    if (date && date instanceof Date) {
      set(this, 'time', this.getTimeZoneDate(date).format('HH:mm'));
      set(this, 'isTimePickerDisabled', false);
    } else {
      set(this, 'isTimePickerDisabled', true);
    }
  },

  getTimeZoneDate(date) {
    return moment(date)
      .tz(get(this, 'timeZone'))
      .locale(get(this, 'locale'));
  },

  actions: {
    onTimeChange(time = '00:00') {
      const onChange = get(this, 'onChange');
      const date = get(this, 'date');
      const [hour, minute] = time.split(':');
      const newDateTime = this.getTimeZoneDate(date)
                                  .set({hour, minute, second: 0})
                                  .toDate();

      if (date && date instanceof Date) {
        set(this, 'date', newDateTime);
      } else {
        return;
      }

      if (onChange && onChange instanceof Function) {
        onChange(newDateTime);
      }
    },
    onDateChange() {
      this.send('onTimeChange', get(this, 'time'));
    }
  }
});
