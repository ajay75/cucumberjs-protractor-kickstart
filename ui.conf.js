'use strict';

exports.config = {
  getPageTimeout: 10000,
  allScriptsTimeout: 500000,
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',
  rootElement: '[ng-app]',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    browserName: 'chrome',
    timeout : 200000,
    debug: true
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: 'e2e/features/ui/*.feature',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: [
      'e2e/step-definitions/**/*.js',
      'e2e/support/*.js'
    ],
    format: 'pretty',
    tags: '@steps'
  },
  maxSessions: 1
};

