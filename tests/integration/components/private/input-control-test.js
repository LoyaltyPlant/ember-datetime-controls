import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('private/input-control', 'Integration | Component | private/input control', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{private/input-control}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#private/input-control}}
      template block text
    {{/private/input-control}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
