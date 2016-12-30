import Ember from "ember";
import moment from "moment";
import layout from "./template";
import BasePickerMixin from "ember-datetime-controls/mixins/base-picker-mixin";
import EmberDateTimeControlsConfig from "ember-datetime-controls/config";


const {
  Component,
  computed,
  computed: { bool },
  get,
  set
} = Ember;

export default Component.extend(BasePickerMixin, {
  layout,
  classNames: ['dt-pickers__picker', 'dt-pickers__picker--date'],

  format: EmberDateTimeControlsConfig.format,
  locale: EmberDateTimeControlsConfig.locale,
  timeZone: EmberDateTimeControlsConfig.timeZone,

  formattedDate: computed('date', function () {
    const date = get(this, 'date');
    if (date && date instanceof Date) {
      return moment(date)
        .tz(this.get('timeZone'))
        .locale(this.get('locale'))
        .format(this.get('format'));
    }
  }),

  isDateSelected: bool('date'),

  didInsertElement() {
    this._super(...arguments);

    set(this, 'hideCalendar', this.hideCalendar.bind(this));
    this.$().on('hide-all-pickers', this.hideCalendar);
  },

  willDestroyElement() {
    this._super(...arguments);

    this.$().on('hide-all-pickers', this.hideCalendar);
  },

  hideCalendar() {
    set(this, 'show', false);
  },

  click(e) {
    e.stopPropagation();
    this.send('toggle');
  },

  actions: {
    toggle() {
      this.toggleProperty('show');
    },
    onDateUpdated(dateObj) {
      const timeZone = get(this, 'timeZone');
      const locale = get(this, 'locale');
      const onDateUpdated = get(this, 'onDateUpdated');
      const newDate = moment()
        .tz(timeZone)
        .locale(locale)
        .set(dateObj)
        .toDate();

      set(this, 'date', newDate);
      if (onDateUpdated && onDateUpdated instanceof Function) {
        onDateUpdated(get(this, 'date'));
      }

        this.send('toggle');
    },
    cleanDate() {
      set(this, 'date', null);
    }
  }
});
