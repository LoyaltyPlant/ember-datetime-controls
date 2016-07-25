import Ember from "ember";
import moment from "moment";

export default Ember.Route.extend({
  model() {
    let date = moment().toDate();

    return {
      date,
      minDate: moment().subtract(1, 'days').startOf('day').toDate(),
      maxDate: moment().add(1, 'days').startOf('day').toDate()
    };
  }
});
