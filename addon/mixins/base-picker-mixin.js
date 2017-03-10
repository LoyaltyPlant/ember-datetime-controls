import Ember from "ember";
import Config from "ember-datetime-controls/config";

export default Ember.Mixin.create({
  format: Config.format,
  locale: Config.locale,
  timeZone: Config.timeZone
});
