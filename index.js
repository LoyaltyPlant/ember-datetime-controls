/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-datetime-controls',
  isDevelopingAddon: function() {
    return true;
  },

  included: function (app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/fonts/dt.svg', {destDir: 'assets/fonts'});
    app.import('vendor/fonts/dt.eot', {destDir: 'assets/fonts'});
    app.import('vendor/fonts/dt.ttf', {destDir: 'assets/fonts'});
    app.import('vendor/fonts/dt.woff', {destDir: 'assets/fonts'});
    app.import('vendor/fonts/dt.woff2', {destDir: 'assets/fonts'});
  }

};
