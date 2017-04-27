/* eslint-env node */
'use strict';

module.exports = function (/* environment, appConfig */) {
  return {
    moment: {
      includeLocales: true,
      includeTimezone: 'subset'
    }
  };
};
