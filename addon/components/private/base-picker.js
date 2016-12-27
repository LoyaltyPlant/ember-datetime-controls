import Ember from "ember";
import moment from "moment";
import EmberDateTimeControlsConfig from "ember-datetime-controls/config";
import layout from "ember-datetime-controls/templates/components/private/base-picker";
import {isAmPm} from "ember-datetime-controls/utils/locale";

const {
  get,
  set,
  computed,
  computed: { notEmpty }
} = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ['dt-controls'],

  date: null,
  dateEnabled: true,
  disabledDates: null,
  documentClickHandler: null,
  isAmPm: null,
  isShowCalendar: false,
  maxDate: null,
  maxTime: null,
  minDate: null,
  minTime: null,
  timeEnabled: true,
  format: EmberDateTimeControlsConfig.format,
  locale: EmberDateTimeControlsConfig.locale,
  timeZone: EmberDateTimeControlsConfig.timeZone,

  currentHours: computed('date', {
    get() {
      const format = (get(this, 'isAmPm')) ? 'hh' : 'HH';
      return this._getDatetime(format);
    }
  }),

  currentMinute: computed('date', {
    get() {
      return this._getDatetime('mm');
    }
  }),

  isDateTimeSelected: notEmpty('date'),

  formattedDate: computed('date', function () {
    const date = get(this, 'date');
    if (date && date instanceof Date) {
      return moment(date)
        .tz(this.get('timeZone'))
        .locale(this.get('locale'))
        .format(this.get('format'));
    }
  }),

  meridiem: computed('date', {
    get() {
      return this._getDatetime('a');
    }
  }),

  _getDatetime(format) {
    return moment(get(this, 'date'))
      .tz(get(this, 'timeZone'))
      .locale(get(this, 'locale'))
      .format(format);
  },

  hidePickers() {
    this.send('hideAllPickers');
  },

  init() {
    this._super(...arguments);

    set(this, 'isAmPm', isAmPm(get(this, 'locale')));
    set(this, 'documentClickHandler', this.hidePickers.bind(this));
    document.addEventListener('click', get(this, 'documentClickHandler'));
  },

  didReceiveAttrs() {
    const date = get(this, 'date');
    this._super(...arguments);
    if (date && date instanceof Date) {
      set(this, 'date', date);
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    document.removeEventListener('click', get(this, 'documentClickHandler'));
  },

  onchange(date) {
    set(this, 'date', date);
  },

  actions: {
    hideAllPickers() {
      this.send('hideHourPicker');
      this.send('hideMinutePicker');
      this.send('hideCalendar');
    },

    hideCalendar() {
      set(this, 'isShowCalendar', false);
    },

    hideHourPicker() {
      set(this, 'isShowHourPicker', false);
    },

    hideMinutePicker() {
      set(this, 'isShowMinutePicker', false);
    },

    showCalendar() {
      set(this, 'isShowCalendar', true);
      this.send('hideMinutePicker');
      this.send('hideHourPicker');
    },

    showHourPicker() {
      set(this, 'isShowHourPicker', true);
      this.send('hideMinutePicker');
      this.send('hideCalendar');
    },

    showMinutePicker() {
      set(this, 'isShowMinutePicker', true);
      this.send('hideHourPicker');
      this.send('hideCalendar');
    },

    updateDate(dateProperties) {
      let newDate = moment.tz(get(this, 'date'), get(this, 'timeZone')).set(dateProperties);

      if (!get(this, 'timeEnabled')) {
        newDate = newDate.startOf('date');
      }
      if (this.onchange && this.onchange instanceof Function) {
        this.onchange(newDate.toDate());
      } else {
        Ember.Logger.warn('Not implemented "onchange" callback');
      }
      this.send('hideCalendar');
    }
  }

});
