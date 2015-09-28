'use strict';

exports.config = {

  rootElement: '#MyTNT',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: 'e2e/features/**/*.feature',

  framework: 'cucumber',
  cucumberOpts: {
    require: [
      'e2e/steps/*.js',
      'e2e/support/*.js'
    ],
    format: 'pretty',
    tags: '@sprint8'
  },
  maxSessions: 1,
};


