import Ember from 'ember';
import PICKER_STATE_BUS from 'ember-datetime-controls/utils/picker-state-bus';

/**
 * This mixin provides 'dispatchHideAllPickersEvent'
 * method which triggers 'hide-pickers' event
 *
 * Also it subscribes to 'hide-pickers' event
 * and call 'hide' method for all components,
 * except component which trigger the event.
 */

export default Ember.Mixin.create({
  init() {
    this._super(...arguments);
    const self = this;

    PICKER_STATE_BUS.on('hide-pickers', function (targetObject) {
      if (targetObject &&
        self !== targetObject &&
        self.hide &&
        (!targetObject.get('isDestroyed') || targetObject.get('isDestroying'))) {
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
