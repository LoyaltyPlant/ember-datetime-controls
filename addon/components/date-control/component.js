import Ember from "ember";
import moment from "moment";
import layout from "./template";
import Config from "ember-datetime-controls/config";
import PickerStateBusMixin from "ember-datetime-controls/mixins/picker-state-bus-mixin";

const {
  Component,
  computed,
  computed: { bool },
  get,
  set
} = Ember;

export default Component.extend(PickerStateBusMixin, {
  layout,
  classNames: ['dt-pickers__picker', 'dt-pickers__picker--date'],

  //passed in
  date: null,

  show: false,
  format: null,
  timeZone: null,
  locale: null,

  formattedDate: computed('date', function () {
    const date = get(this, 'date');

    if (date && date instanceof Date) {
      return moment(date)
        .tz(get(this, 'timeZone') || Config.timeZone)
        .locale(get(this, 'locale') || Config.locale)
        .format(get(this, 'format') || Config.format);
    } else {
      return null;
    }
  }),

  isDateSelected: bool('date'),

  click(e) {
    e.stopPropagation();
    this.send('toggle');
  },

  hide() {
    set(this, 'show', false);
  },

  actions: {
    toggle() {
      this.dispatchHideAllPickersEvent();
      this.toggleProperty('show');
    },
    onDateUpdated(dateObj) {
      const timeZone = get(this, 'timeZone');
      const locale = get(this, 'locale');
      const onChange = get(this, 'onChange');
      const newDate = moment()
        .tz(timeZone)
        .locale(locale)
        .set(dateObj)
        .toDate();

      if (onChange && onChange instanceof Function) {
        onChange(newDate);
      } else {
        set(this, 'date', newDate);
      }

      this.send('toggle');
    },
    cleanDate() {
      set(this, 'date', null);
    }
  }
});
