import Ember from "ember";
import EmberDateTimeControlsConfig from "ember-datetime-controls/config";

export default Ember.Mixin.create({
  format: EmberDateTimeControlsConfig.format,
  locale: EmberDateTimeControlsConfig.locale,
  timeZone: EmberDateTimeControlsConfig.timeZone
});
