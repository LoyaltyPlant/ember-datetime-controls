import Ember from 'ember';
import layout from './template';
import BasePickerMixin from 'ember-datetime-controls/mixins/base-picker-mixin';


const {
  get,
  inject: {
    service
  },
  Component,
} = Ember;

export default Component.extend(BasePickerMixin, {
  moment: service(),

  layout,
  classNames: ['dt-pickers'],

  init() {
    this._super(...arguments);

    const moment = get(this, 'moment');

    if (this.attrs.date && !this.attrs.time) {
      this.time = moment.moment(this.attrs.date).format("HH:mm");
    }
  }

});
