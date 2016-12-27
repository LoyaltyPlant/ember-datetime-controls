import Ember from 'ember';

const {
  get,
  set
} = Ember;

export default Ember.Mixin.create({
  event: new Event('hide-all-pickers'),

  init() {
    this._super(...arguments);

    set(this, 'dispatchHideAllPickersEvent', this.dispatchHideAllPickersEvent.bind(this))
    document.addEventListener('click', this.dispatchHideAllPickersEvent);
  },
  willDestroyElement() {
    this._super(...arguments);

    document.removeEventListener('click', this.dispatchHideAllPickersEvent);
  },
  dispatchHideAllPickersEvent() {
    const event = get(this, 'event');
    const [elem] = this.$();

    elem.dispatchEvent(event, {
      bubbles: false
    });
  }
});
