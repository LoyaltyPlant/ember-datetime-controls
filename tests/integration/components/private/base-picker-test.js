import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('private/base-picker', 'Integration | Component | private/base picker', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{private/base-picker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#private/base-picker}}
      template block text
    {{/private/base-picker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
