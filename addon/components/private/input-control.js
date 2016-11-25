import Ember from "ember";
import moment from "moment";
import layout from "ember-datetime-controls/templates/components/private/input-control";
import BasePicker from "./base-picker";

const {
  computed,
  get,
  set,
  $
} = Ember;

export default BasePicker.extend({
  layout,
  classNames: ['dt-control__input-group'],
  locale: null,
  timeZone: null,
  date: null,
  format: null,
  documentClickHandler: null,

  formattedDate: computed('date', function () {
    return moment(get(this, 'date'))
      .tz(this.get('timeZone'))
      .locale(this.get('locale'))
      .format(this.get('format'));
  }),

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

  meridiem: computed('date', {
    get() {
      return this._getDatetime('a');
    }
  }),

  init() {
    this._super(...arguments);
    set(this, 'documentClickHandler', this.hidePickers.bind(this));
    document.addEventListener('click', get(this, 'documentClickHandler'));
  },

  willDestroyElement() {
    this._super(...arguments);
    document.removeEventListener('click', get(this, 'documentClickHandler'));
  },

  _getDatetime(format) {
    return moment(get(this, 'date'))
      .tz(get(this, 'timeZone'))
      .locale(get(this, 'locale'))
      .format(format);
  },

  hidePickers() {
    this.send('hideAllPickers');
  }
});
