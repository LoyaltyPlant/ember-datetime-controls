/*jshint node:true*/
'use strict';

module.exports = function (/* environment, appConfig */) {
  return {
    moment: {
      includeLocales: true,
      includeTimezone: '2010-2020'
    }
  };
};
