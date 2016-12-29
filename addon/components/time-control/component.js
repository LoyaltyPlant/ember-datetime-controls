import Ember from 'ember';
import layout from './template';
import BasePicker from "../private/base-picker";
import EmberDateTimeControlsConfig from "ember-datetime-controls/config";
import {isAmPm} from 'ember-datetime-controls/utils/locale';
import {MAX_HOURS} from 'ember-datetime-controls/utils/constants';
import BasePickerMixin from 'ember-datetime-controls/mixins/base-picker-mixin';

const {
  Component,
  computed,
  get,
  set
} = Ember;

export default Component.extend(BasePickerMixin, {
  layout,
  classNames: ['dt-pickers__picker', 'dt-pickers__picker--time'],

  time: 'HH:mm',
  locale: EmberDateTimeControlsConfig.locale,

  currentHour: computed('time', {
    get() {
      const [hour] = get(this, 'time').split(':');
      const isAmPm = get(this, 'isAmPm');

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
      const [hour, minute] = get(this, 'time').split(':');

      return +hour > 11 ? 'PM' : 'AM';
    }
  }),

  didReceiveAttrs() {
    const time = get(this, 'time') || 'HH:mm';
    set(this, 'time', time);
  },

  didInsertElement() {
    this._super(...arguments);
    set(this, 'hideAllPickers', this.hideAllPickers.bind(this));

    this.$().on('hide-all-pickers', this.hideAllPickers);
  },

  willDestroyElement() {
    this._super(...arguments);

    this.$().off('hide-all-pickers', this.hideAllPickers);
  },

  hideAllPickers() {
    set(this, 'showHours', false);
    set(this, 'showMinutes', false);
  },

  actions: {
    onchange(time) {
      const onchange = get(this, 'onchange');

      set(this, 'time', time);
      if (onchange && onchange instanceof Function) {
        onchange(time);
      }
      this.hideAllPickers();
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
