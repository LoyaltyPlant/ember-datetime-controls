import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('datetime-period-picker', 'Integration | Component | datetime period picker', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{datetime-period-picker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#datetime-period-picker}}
      template block text
    {{/datetime-period-picker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
