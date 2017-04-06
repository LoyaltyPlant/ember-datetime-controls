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
  classNameBindings: ['small'],

  //passed in
  date: null,

  show: false,

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

  didReceiveAttrs() {
    const size = get(this, 'size');

    this._super(...arguments);

    switch (size) {
      case 'small':
        set(this, 'small', 'dt-pickers__picker--small');
    }
  },

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
