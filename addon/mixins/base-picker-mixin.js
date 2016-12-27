import Ember from 'ember';

const {
  get
} = Ember;

export default Ember.Mixin.create({
  event: new Event('hide-all-pickers'),

  init() {
    this._super(...arguments);

    document.addEventListener('click', this.dispatchHideAllPickersEvent.bind(this));
  },
  willDestroyElement() {
    this._super(...arguments);

    document.removeEventListener('click', this.dispatchHideAllPickersEvent.bind(this));
  },
  dispatchHideAllPickersEvent() {
    const event = get(this, 'event');
    const [elem] = this.$();

    elem.dispatchEvent(event, {
      bubbles: false
    });
  }
});
