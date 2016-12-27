import Ember from "ember";

export default Ember.Controller.extend({
  newDate: null,
  actions: {
    log(date) {
      // console.log(date);
      Ember.set(this, 'newDate', date);
    }
  }
});
