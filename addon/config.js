import Ember from "ember";

export default Ember.Object.extend({
  format: "LL",
  locale: window.navigator.userLanguage || window.navigator.language || 'en',
  timeZone: 'Europe/Moscow'
}).create({});
