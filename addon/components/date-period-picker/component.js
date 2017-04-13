import Ember from 'ember';
import layout from './template';

const {
  Component,
  get
} = Ember;

export default Component.extend({
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
      this.attrs.onchange(dateFrom, dateTo);
    }
  }


});
