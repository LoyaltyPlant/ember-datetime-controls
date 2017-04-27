import Ember from 'ember';

const {
  Evented
} = Ember;

/**
 * This object is event bus for all components.
 * It's triggers 'hide-pickers' event.
 */

const PICKER_STATE_BUS = Ember.Object.extend(Evented, {

  triggerClose() {
    this.trigger('hide-pickers');
  }

}).create({});

if (document) {
  document.addEventListener('click', PICKER_STATE_BUS.triggerClose.bind(PICKER_STATE_BUS));
}

export default PICKER_STATE_BUS;
