import Ember from 'ember';
import layout from './template';

const {
  Component
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
  disabledDatesTo: null
});
