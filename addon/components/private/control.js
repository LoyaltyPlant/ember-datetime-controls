import Ember from 'ember';

const {
  set,
} = Ember;

export default Ember.Component.extend({
  classNameBindings: ['isControlsUp:controls-up'],
  didInsertElement() {
    this._super(...arguments);
    const viewportHeight = window.screen.availHeight;
    const [element] = this.$();
    const { top } = element.getBoundingClientRect();
    const spacingToBottom = viewportHeight - top;
    const elementHeight = element.offsetHeight;

    if ( spacingToBottom < elementHeight ) {
      set(this, 'isControlsUp', true);
    }
  }
});
