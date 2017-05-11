import Ember from 'ember';
import layout from './template';
import { isAmPm } from 'ember-datetime-controls/utils/locale';
import { MAX_HOURS } from 'ember-datetime-controls/utils/constants';
import BasePickerMixin from 'ember-datetime-controls/mixins/base-picker-mixin';
import PickerStateBusMixin from 'ember-datetime-controls/mixins/picker-state-bus-mixin';

const {
  Component,
  computed,
  get,
  set
} = Ember;

export default Component.extend(BasePickerMixin, PickerStateBusMixin, {
  layout,
  classNames: ['dt-pickers__picker', 'dt-pickers__picker--time'],

  disabled: false,
  time: null,

  currentHour: computed('time', {
    get() {
      const isAmPm = get(this, 'isAmPm');
      const time = get(this, 'time');
      let hours = "";

      if (time) {
        hours = time.split(':')[0];

        if (isAmPm && !isNaN(+hours)) {
          hours = (MAX_HOURS + Number(hours)) % 12;
          hours = `0${hours}`.slice(-2);
        }
      }

      return hours;
    }
  }),

  currentMinute: computed('time', {
    get() {
      const time = get(this, 'time');
      let minutes = "";

      if (time) {
        minutes = get(this, 'time').split(':')[1];
      }
      return minutes;
    }
  }),

  isAmPm: computed({
    get() {
      return isAmPm(get(this, 'locale'));
    }
  }),

  meridiem: computed('time', {
    get() {
      const time = get(this, 'time');
      let meridiem = "";

      if (time) {
        const [hours] = get(this, 'time').split(':');
        meridiem = +hours > 11 ? 'PM' : 'AM';
      }

      return meridiem;
    }
  }),

  didReceiveAttrs() {
    this._super(...arguments);

    if ( !get(this, 'time') ) {
      set(this, 'time', 'hh:mm');
    }

    this.hide();
  },

  hide() {
    set(this, 'showHours', false);
    set(this, 'showMinutes', false);
  },

  actions: {
    onchange(time) {
      const onchange = get(this, 'onchange');

      if (onchange && onchange instanceof Function) {
        onchange(time);
      } else {
        set(this, 'time', time);
      }
      this.hide();
    },
    toggleHours() {
      this.dispatchHideAllPickersEvent();
      this.toggleProperty('showHours');
    },
    toggleMinutes() {
      this.dispatchHideAllPickersEvent();
      this.toggleProperty('showMinutes');
    }
  }
});
