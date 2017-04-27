import Ember from 'ember';

const {
  set,
  computed: {
    alias
  },
  Controller
} = Ember;

export default Controller.extend({
  newDate: null,

  dates: alias('model'),

  actions: {
    log(date) {
      set(this, 'newDate', date);
    }
  }
});
