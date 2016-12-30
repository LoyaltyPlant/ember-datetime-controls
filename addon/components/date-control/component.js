import Ember from "ember";
import moment from "moment";
import layout from "./template";
import BasePickerMixin from "ember-datetime-controls/mixins/base-picker-mixin";
import PickerStateBusMixin from "ember-datetime-controls/mixins/picker-state-bus-mixin";


const {
  Component,
  computed,
  computed: { bool },
  get,
  set
} = Ember;

export default Component.extend(BasePickerMixin, PickerStateBusMixin, {
  layout,
  classNames: ['dt-pickers__picker', 'dt-pickers__picker--date'],

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

  hide() {
    set(this, 'show', false);
  },

  click(e) {
    e.stopPropagation();
    this.send('toggle');
  },

  actions: {
    toggle() {
      this.dispatchHideAllPickersEvent();
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
