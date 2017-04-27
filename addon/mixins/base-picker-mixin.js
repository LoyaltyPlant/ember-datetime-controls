import Ember from 'ember';
import Config from 'ember-datetime-controls/config';

const {
  Mixin
} = Ember;

export default Mixin.create({
  format: Config.format,
  locale: Config.locale,
  timeZone: Config.timeZone
});
