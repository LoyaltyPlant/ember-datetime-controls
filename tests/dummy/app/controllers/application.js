import Ember from "ember";

export default Ember.Controller.extend({
  // newDate: new Date(),
  newDate: null,
  actions: {
    log(date) {
      // console.log(date);
      Ember.set(this, 'newDate', date);
    }
  }
});
