import Ember from 'ember';
import layout from './template';
import BasePickerMixin from 'ember-datetime-controls/mixins/base-picker-mixin';

const {
  Component
} = Ember;

export default Component.extend(BasePickerMixin, {
  layout,
  classNames: ['dt-pickers'],

  //functions
  onChange: null,

  //passed in
  date: null,
  minDate: null,
  maxDate: null,
  disabledDates: null,
});
