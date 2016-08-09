import Ember from "ember";
import moment from "moment";
import layout from "ember-datetime-controls/templates/components/private/input-control";

export default Ember.Component.extend({
  layout,

  locale: null,
  timeZone: null,
  date: null,
  format: null,

  formattedDate: Ember.computed('date', function() {
    return moment(this.get('date'))
      .tz(this.get('timeZone'))
      .locale(this.get('locale'))
      .format(this.get('format'));
  })
});
