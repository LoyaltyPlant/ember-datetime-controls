/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-datetime-controls',

  included: function (app, parentAddon) {
    this._super.included.apply(this, arguments);

    var target = (parentAddon || app);

    target.import('vendor/fonts/dt.svg', {destDir: 'assets/fonts'});
    target.import('vendor/fonts/dt.eot', {destDir: 'assets/fonts'});
    target.import('vendor/fonts/dt.ttf', {destDir: 'assets/fonts'});
    target.import('vendor/fonts/dt.woff', {destDir: 'assets/fonts'});
    target.import('vendor/fonts/dt.woff2', {destDir: 'assets/fonts'});
  }

};
