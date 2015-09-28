'use strict';

exports.config = {

  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',
  rootElement: '#MyTNT',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    browserName: 'chrome',
    debug: true
  },

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
    tags: '@steps'
  },
  maxSessions: 1,
};
