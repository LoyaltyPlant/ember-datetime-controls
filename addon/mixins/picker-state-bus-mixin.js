import Ember from 'ember';
import PICKER_STATE_BUS from 'ember-datetime-controls/utils/picker-state-bus';

const {
  get,
  Mixin
} = Ember;
/**
 * This mixin provides 'dispatchHideAllPickersEvent'
 * method which triggers 'hide-pickers' event
 *
 * Also it subscribes to 'hide-pickers' event
 * and call 'hide' method for all components,
 * except component which trigger the event.
 */

export default Mixin.create({
  init() {
    this._super(...arguments);
    const self = this;

    PICKER_STATE_BUS.on('hide-pickers', function (targetObject) {
      if (!targetObject ||
        self.hide &&
        (!get(targetObject, 'isDestroyed') || get(targetObject, 'isDestroying'))) {
        self.hide();
      }
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    PICKER_STATE_BUS.off('hide-pickers');
  },

  dispatchHideAllPickersEvent() {
    PICKER_STATE_BUS.trigger('hide-pickers', this);
  }
});
