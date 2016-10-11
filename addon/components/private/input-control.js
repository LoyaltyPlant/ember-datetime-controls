import Ember from "ember";
import moment from "moment";
import layout from "ember-datetime-controls/templates/components/private/input-control";
import BasePicker from './base-picker';

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

  formattedDate: computed('date', function() {
    return moment(this.get('date'))
      .tz(this.get('timeZone'))
      .locale(this.get('locale'))
      .format(this.get('format'));
  }),

  currentHours: computed('date', function () {
    const format = (get(this, 'isAmPm')) ? 'hh' : 'HH';
    return this._getDatetime(format);
  }),
  currentMinute: computed('date', function () {
    return this._getDatetime('mm');
  }),

  meridiem: computed('date', function () {
    return this._getDatetime('a');
  }),

  _getDatetime(format) {
    return moment(this.get('date'))
      .tz(this.get('timeZone'))
      .locale(this.get('locale'))
      .format(format);
  },
  init() {
    this._super(...arguments);
    const self = this;
    $('html, body').click(() => {
      self.send('hideAllPickers');
    });
  },
  willDestroyElement() {
    $('html, body').unbind('click');
  }

});
