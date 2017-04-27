import Ember from 'ember';
import layout from './template';
import { MAX_MINUTES } from 'ember-datetime-controls/utils/constants';
import PickerPositioningMixin from 'ember-datetime-controls/mixins/picker-positioning-mixin';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend(PickerPositioningMixin, {
  layout,
  classNames: ['dt-time-list'],

  minutes: computed({
    get() {
      const minutes = [];
      for (let i = 0; i < MAX_MINUTES; i += 5) {
        minutes.push(`0${i}`.slice(-2));
      }
      return minutes;
    }
  }),

  actions: {
    select(minute) {
      const [hour] = get(this, 'time').split(':');
      const time = `${hour}:${minute}`;

      return get(this, 'onchange')(time);
    }
  }
});
