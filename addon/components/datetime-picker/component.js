import Ember from 'ember';
import layout from './template';
import moment from 'moment';

const {
  get,
  set
} = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ['dt-pickers'],

  didReceiveAttrs() {
    this._super(...arguments);
    const date = get(this, 'date');

    if (date && date instanceof Date) {
      set(this, 'time', this.getTimeZoneDate(date).format('HH:mm'));
    }
  },

  getTimeZoneDate(date) {
    return moment(date)
      .tz(get(this, 'timeZone'))
      .locale(get(this, 'locale'));
  },

  actions: {
    onTimeChange(time) {
      const onchange = get(this, 'onchange');
      const date = get(this, 'date');

      if (date && date instanceof Date) {
        const [hour, minute] = time.split(':');
        const newDateTime = this.getTimeZoneDate(date)
                              .set({hour,minute, second: 0})
                              .toDate();

        set(this, 'date', newDateTime);
      }

      if (onchange && onchange instanceof Function) {
        onchange(time);
      }
    },
    onDateChange() {
      this.send('onTimeChange', get(this, 'time'));
    }
  }
});
