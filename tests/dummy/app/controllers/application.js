import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    onTimeChange(date) {
      console.log(date);
    }
  }
});
