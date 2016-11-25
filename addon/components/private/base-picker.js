import Ember from "ember";
import moment from "moment";
import EmberDateTimeControlsConfig from "ember-datetime-controls/config";
import layout from "ember-datetime-controls/templates/components/private/base-picker";

const {
  get,
  set,
} = Ember;

export default Ember.Component.extend({
  layout,
  date: null,
  dateEnabled: true,
  disabledDates: null,
  format: EmberDateTimeControlsConfig.format,
  isAmPm: null,
  isControlsUp: false,
  isShowCalendar: false,
  locale: EmberDateTimeControlsConfig.locale,
  maxDate: null,
  maxTime: null,
  minDate: null,
  minTime: null,
  timeEnabled: true,
  timeZone: EmberDateTimeControlsConfig.timeZone,

  didReceiveAttrs() {
    this._super(...arguments);

    set(this, 'isAmPm', !!moment()
      .locale(get(this, 'locale'))
      .format('LT')
      .match(/(AM|PM)/g)
    );
  },

  onchange(date) {
    set(this, 'date', date);
  },

  actions: {
    showCalendar() {
      set(this, 'isShowCalendar', true);
      this.send('hideMinutePicker');
      this.send('hideHourPicker');
    },

    hideCalendar() {
      set(this, 'isShowCalendar', false);
    },

    updateDate(dateProperties) {
      let newDate = moment.tz(get(this, 'date'), get(this, 'timeZone')).set(dateProperties);

      if (!get(this, 'timeEnabled')) {
        newDate = newDate.startOf('date');
      }
      if (this.onchange) {
        this.onchange(newDate.toDate());
      } else {
        Ember.Logger.warn('Not implemented "onchange" callback');
      }
      this.send('hideCalendar');
    },

    showMinutePicker() {
      set(this, 'isShowMinutePicker', true);
      this.send('hideHourPicker');
      this.send('hideCalendar');
    },

    hideMinutePicker () {
      set(this, 'isShowMinutePicker', false);
    },

    showHourPicker () {
      set(this, 'isShowHourPicker', true);
      this.send('hideMinutePicker');
      this.send('hideCalendar');
    },

    hideHourPicker () {
      set(this, 'isShowHourPicker', false);
    },

    hideAllPickers() {
      this.send('hideHourPicker');
      this.send('hideMinutePicker');
      this.send('hideCalendar');
    }
  }

});
