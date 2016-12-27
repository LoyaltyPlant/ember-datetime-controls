import Ember from 'ember';
import layout from './template';
import BasePickerMixin from 'ember-datetime-controls/mixins/base-picker-mixin';
import EmberDateTimeControlsConfig from "ember-datetime-controls/config";


const {
  computed,
  get,
  set
} = Ember;

export default Ember.Component.extend(BasePickerMixin, {
  layout,

  format: EmberDateTimeControlsConfig.format,
  locale: EmberDateTimeControlsConfig.locale,
  timeZone: EmberDateTimeControlsConfig.timeZone,

  formattedDate: computed('date', function () {
    const date = get(this, 'date');
    if (date && date instanceof Date) {
      return moment(date)
        .tz(this.get('timeZone'))
        .locale(this.get('locale'))
        .format(this.get('format'));
    }
  }),

  didInsertElement() {
    this._super(...arguments);

    set(this, 'hideCalendar', this.hideCalendar.bind(this));
    this.$().on('hide-all-pickers', this.hideCalendar);
  },

  willDestroyElement() {
    this._super(...arguments);

    this.$().on('hide-all-pickers', this.hideCalendar);
  },

  hideCalendar() {
    set(this, 'show', false);
  },

  actions: {
    toggle() {
      this.toggleProperty('show');
    }
  }
});
