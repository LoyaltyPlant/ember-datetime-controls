import Ember from 'ember';
import layout from 'ember-datetime-controls/templates/components/private/time-control';
import moment from 'moment';

const {
  get,
  set,
  computed,
  A
} = Ember;

export default Ember.Component.extend({
  layout,
  date: null,

  disableDecreaseMinutesBtn: null,
  disableIncreaseMinutesBtn: null,
  disableDecreaseHoursBtn: null,
  disableIncreaseHoursBtn: null,

  hours: computed('date', function () {
    if ( get(this, 'isAmPmTimezone') ) {
      return this.getTimeFormat('hh');
    } else {
      return this.getTimeFormat('HH');
    }
  }),
  minutes: computed('date', function () {
    return this.getTimeFormat('mm');
  }),
  meridiem: computed('date', function () {
    return this.getTimeFormat('A');
  }),
  isAmPmTimezone: computed('date', function () {
    return !!this.getDate().format('LT').match(/(AM|PM)/g);
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
  _getMeridiem() {
    switch (get(this, 'meridiem')) {
      case 'AM':
        return 'AM';
      case 'PM':
        return 'PM';
    }
  },
  _setTime([hour, minute], value, format = null) {
    if ( !format ) {
      set(this, 'date', moment(this.get('date')).tz(this.get('timeZone')).set({hour, minute}).toDate());
      return false;
    }
    set(this, 'date', moment(this.get('date')).tz(this.get('timeZone')).set(format, value).toDate());
    return false;
  },
  _changeTime(max, min, step, format, operand) {
    const shortFormatName = (format === 'hour') ? 'HH' : 'mm';
    const minTime = get(this, 'minTime');
    const maxTime = get(this, 'maxTime');
    let currentTimeValue;

    if ( operand === '+' ) {
      currentTimeValue = +moment(this.get('date')).tz(this.get('timeZone')).format(shortFormatName) + step;
    } else {
      currentTimeValue = +moment(this.get('date')).tz(this.get('timeZone')).format(shortFormatName) - step;
    }

    const currentTime = moment(this.get('date')).tz(this.get('timeZone')).set(format, currentTimeValue).format('HH:mm');

    if ( minTime > currentTime ) {
      set(this, 'disableDecreaseHoursBtn', true);
      set(this, 'disableDecreaseMinutesBtn', true);
      return this._setTime(minTime.split(':'));
    }
    if ( format === 'hour' ) {
      set(this, 'disableDecreaseHoursBtn', null);
    }
    set(this, 'disableDecreaseMinutesBtn', null);
    if ( maxTime < currentTime ) {
      set(this, 'disableIncreaseHoursBtn', true);
      set(this, 'disableIncreaseMinutesBtn', true);
      return this._setTime(maxTime.split(':'));
    }

    if ( format === 'hour' ) {
      set(this, 'disableIncreaseHoursBtn', null);
    }
    set(this, 'disableIncreaseMinutesBtn', null);
    if (currentTimeValue > max) {
      currentTimeValue = min;
    }
    if (currentTimeValue < min) {
      currentTimeValue = max;
    }
    return this._setTime(A(), currentTimeValue, format);
  },
  actions: {
    changeMeridiem() {
      const currentHours = +moment(this.get('date')).format('HH');
      switch (get(this, 'meridiem')) {
        case 'AM':
          set(this, 'date', moment(this.get('date')).set('hours', ( (currentHours + 12) % 24)) );
          break;
        case 'PM':
          set(this, 'date', moment(this.get('date')).set('hours', ( (currentHours + 12) % 24)) );
          break;
      }
    },
    increaseTime() {
      this._changeTime(...arguments, '+');
    },
    decreaseTime() {
      this._changeTime(...arguments, '-');
    }
  },
  didInsertElement() {
    this._super(...arguments);
    // const self = this;
    // this.$().on('wheel', function ({target: { dataset: { max, min, step, format } }, originalEvent}) {
    //   if ( ( (-originalEvent.wheelDelta < 0) || (originalEvent.deltaY < 0) ) ) {
    //     self.send('increaseTime', max, min, step, format);
    //   } else {
    //     self.send('decreaseTime', max, min, step, format);
    //   }
    //   return false;
    // });
  },
  willDestroyElement() {
    this._super(...arguments);
    this.$().off('wheel');
  }
});
