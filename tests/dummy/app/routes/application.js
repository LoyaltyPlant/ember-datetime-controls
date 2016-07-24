import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  model() {
    let date = moment().subtract(2, 'months').toDate();

    return {
      date
    };
  }
});
