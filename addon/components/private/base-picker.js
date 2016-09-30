import Ember from "ember";
import moment from "moment";
import layout from "ember-datetime-controls/templates/components/private/base-picker";

const {
  get,
  set,
  $
} = Ember;

export default Ember.Component.extend({
  layout,
  isControlsUp: false,
  locale: window.navigator.userLanguage || window.navigator.language || "en",
  timeZone: null,
  format: null,
  date: new Date(),
  minDate: null,
  maxDate: null,
  disabledDates: null,
  minTime: null,
  maxTime: null,
  isAmPm: null,
  timeEnabled: true,
  dateEnabled: true,

  isShowCalendar: false,

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
      set(this, 'date', newDate.toDate());
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
  },
  didReceiveAttrs() {
    this._super(...arguments);
    set(this, 'isAmPm', !!moment(this.get('date'))
      .tz(get(this, 'timeZone'))
      .locale(get(this, 'locale'))
      .format('LT')
      .match(/(AM|PM)/g)
    );
  }
});
