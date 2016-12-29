import Ember from 'ember';
import layout from './template';
import { MAX_HOURS } from 'ember-datetime-controls/utils/constants';


const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  layout,
  classNames: ['dt-time-list'],

  time: null,

  hours: computed({
    get() {
      const hours = [];
      for (let i = 1; i <= MAX_HOURS-1; i++) {
        hours.push(`0${i}`.slice(-2));
      }
      return hours;
    }
  }),

  actions: {
    select(hour) {
      const [, minute] = get(this, 'time').split(':');
      const time = `${hour}:${minute}`;

      return get(this, 'onchange')(time);
    }
  }
});
