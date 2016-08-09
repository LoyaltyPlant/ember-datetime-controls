import Ember from "ember";
import moment from "moment";
import layout from "ember-datetime-controls/templates/components/private/base-picker";

export default Ember.Component.extend({
  layout,

  locale: null,
  timeZone: null,
  format: null,
  date: null,
  minDate: null,
  maxDate: null,
  disabledDates: null,
  minTime: null,
  maxTime: null,

  timeEnabled: true,
  dateEnabled: true,

  _showControls: false,

  actions: {
    show() {
      this.set('_showControls', true);
    },
    hide() {
      this.set('_showControls', false);
    },
    updateDate(dateProperties) {
      let newDate = moment.tz(this.get('date'), this.get('timeZone')).set(dateProperties);

      if (!this.get('timeEnabled')) {
        newDate = newDate.startOf('date');
      }
      this.set('date', newDate.toDate());
      this.send('hide');
    }
  }
});
