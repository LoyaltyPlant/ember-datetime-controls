import Ember from "ember";

const {
  get, set
} = Ember;

export default Ember.Controller.extend({
  actions: {
    onTimeChange(date) {
      console.log(date);
    },
    delete(date) {
      get(this, 'model.datesList').removeObject(date);
    }
  }
});
