import Ember from "ember";
import layout from "./template";
import { isAmPm } from "ember-datetime-controls/utils/locale";
import { MAX_HOURS } from "ember-datetime-controls/utils/constants";
import BasePickerMixin from "ember-datetime-controls/mixins/base-picker-mixin";
import PickerStateBusMixin from "ember-datetime-controls/mixins/picker-state-bus-mixin";

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
  time: 'HH:mm',

  currentHour: computed('time', {
    get() {
      const [hour] = get(this, 'time').split(':');
      const isAmPm = get(this, 'isAmPm');

      if (isNaN(Number(hour))) {
        return hour;
      }

      if (isAmPm) {
        let _hour = (MAX_HOURS + hour) % 12;
        return `0${_hour}`.slice(-2);
      } else {
        return hour;
      }
    }
  }),
  currentMinute: computed('time', {
    get() {
      const [, minute] = get(this, 'time').split(':');

      return minute;
    }
  }),
  isAmPm: computed({
    get() {
      return isAmPm(get(this, 'locale'));
    }
  }),
  meridiem: computed('time', {
    get() {
      const [hour] = get(this, 'time').split(':');

      return +hour > 11 ? 'PM' : 'AM';
    }
  }),

  didReceiveAttrs() {
    const time = get(this, 'time') || 'HH:mm';
    this._super(...arguments);
    set(this, 'time', time);
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
