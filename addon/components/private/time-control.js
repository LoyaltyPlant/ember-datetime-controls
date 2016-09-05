import Ember from 'ember';
import layout from 'ember-datetime-controls/templates/components/private/time-control';
import moment from 'moment';

const {
  get,
  set,
  computed
} = Ember;

export default Ember.Component.extend({
  layout,
  date: null,
  hours: computed('date', function () {
    console.log(this.getTimeFormat('HH'));
    return this.getTimeFormat('HH');
  }),
  minutes: computed('date', function () {
    return this.getTimeFormat('mm');
  }),
  getTimeFormat(format) {
    return this.getDate()
      .format(format);
  },
  getDate() {
    return moment(this.get('date'))
      .tz(this.get('timeZone'))
      .locale(this.get('locale'));
  },
  actions: {
    changeTime({ value, dataset: {format, max, min}}) {
      let _value = +value;
      if (_value > max) {
        _value = min;
      }
      if (_value < min) {
        _value = max;
      }
      set(this, 'date', moment(this.get('date')).tz(this.get('timeZone')).set(format, _value).toDate());
    }
  },
  didInsertElement() {
    this._super(...arguments);
    const self = this;
    this.$().on('wheel', function (e) {
      let value = (+e.target.value) + (+e.target.step) * (Math.max(-1, Math.min(1, (e.originalEvent.wheelDelta || -e.originalEvent.deltaY))));
      e.target.value = value;
      self.send('changeTime', e.target);
      return false;
    });
  },
  willDestroyElement() {
    this._super(...arguments);
    this.$().off('wheel');
  }
});
