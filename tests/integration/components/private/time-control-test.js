import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('private/time-control', 'Integration | Component | private/time control', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{private/time-control}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#private/time-control}}
      template block text
    {{/private/time-control}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
