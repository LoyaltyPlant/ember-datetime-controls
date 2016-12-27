import Ember from 'ember';

const {
  set,
} = Ember;

//TODO: mixin

export default Ember.Component.extend({
  didRender() {
    this._super(...arguments);
    const windowHeight = window.innerHeight;
    const element = this.$();
    const {top, height} = element[0].getBoundingClientRect();
    const spacingToBottom = windowHeight - top;

    if ( spacingToBottom < height ) {
      if(element.hasClass('dt-calendar')) {
        element.css({top: -height - 1});
      } else if(element.hasClass('dt-time-list')) {
        element.css({top: -height - 9});
      }
    }
  }
});
