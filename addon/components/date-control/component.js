import Ember from 'ember';
import moment from 'moment';
import layout from './template';
import Config from 'ember-datetime-controls/config';
import PickerStateBusMixin from 'ember-datetime-controls/mixins/picker-state-bus-mixin';
import BasePickerMixin from 'ember-datetime-controls/mixins/base-picker-mixin';

const {
  Component,
  computed,
  computed: { bool },
  get,
  set
} = Ember;

export default Component.extend(PickerStateBusMixin, BasePickerMixin, {
  layout,
  classNames: ['dt-pickers__picker', 'dt-pickers__picker--date'],
  classNameBindings: ['small', 'isDisabled:dt-pickers__picker--disabled'],

  //passed in
  date: null,

  show: false,

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

  didReceiveAttrs() {
    const size = get(this, 'size');

    this._super(...arguments);

    switch (size) {
      case 'small':
        set(this, 'small', 'dt-pickers__picker--small');
    }
  },

  click(e) {
    if ( get(this, 'isDisabled') ) {
      return ;
    }
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
