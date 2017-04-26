import Ember from 'ember';
import layout from './template';
import BasePickerMixin from 'ember-datetime-controls/mixins/base-picker-mixin';

const {
  Component,
  get,
  set
} = Ember;

export default Component.extend(BasePickerMixin, {
  layout,
  classNames: ['dt-period'],

  //functions
  onDateFromChange: null,
  onDateToChange: null,

  //passed in
  dateFrom: null,
  minDateFrom: null,
  maxDateFrom: null,
  disabledDatesFrom: null,
  dateTo: null,
  minDateTo: null,
  maxDateTo: null,
  disabledDatesTo: null,

  actions: {
    onDateFromChange(newDate) {
      this.send('onChange', newDate, get(this, 'dateTo'));
    },
    onDateToChange(newDate) {
      this.send('onChange', get(this, 'dateFrom'), newDate);
    },
    onChange(dateFrom, dateTo) {
      if ( this.attrs.onchange && this.attrs.onchange instanceof Function ) {
        return this.attrs.onchange(dateFrom, dateTo);
      }
      set(this, 'dateFrom', dateFrom);
      set(this, 'dateTo', dateTo);
    }
  }


});
