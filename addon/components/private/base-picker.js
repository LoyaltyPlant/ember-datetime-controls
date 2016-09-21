import Ember from "ember";
import moment from "moment";
import layout from "ember-datetime-controls/templates/components/private/base-picker";

const {
  get,
  set,
  $
} = Ember;

export default Ember.Component.extend({
  layout,

  locale: window.navigator.userLanguage || window.navigator.language || "en",
  timeZone: null,
  format: null,
  date: new Date(),
  minDate: null,
  maxDate: null,
  disabledDates: null,
  minTime: null,
  maxTime: null,
  isAmPm: null,
  timeEnabled: true,
  dateEnabled: true,

  _showControls: false,

  actions: {
    show() {
      this.set('_showControls', true);
    },
    hide() {
      this.set('_showControls', false);
    },
    updateDate(dateProperties) {
      let newDate = moment.tz(this.get('date'), this.get('timeZone')).set(dateProperties);

      if (!this.get('timeEnabled')) {
        newDate = newDate.startOf('date');
      }

      this.set('date', newDate.toDate());
      this.send('hide');
    }
  },
  init() {
    const self = this;
    this._super(...arguments);
    $('html, body').click(() => {
      self.send('hide');
    });
  },
  willDestroy() {
    $('html, body').unbind();
  },
  didReceiveAttrs() {
    this._super(...arguments);
    set(this, 'isAmPm', !!moment(this.get('date'))
      .tz(get(this, 'timeZone'))
      .locale(get(this, 'locale'))
      .format('LT')
      .match(/(AM|PM)/g)
    );
  }
});
