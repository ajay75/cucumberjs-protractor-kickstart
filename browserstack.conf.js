'use strict';

// An example configuration file.
exports.config = {
    rootElement: '[ng-app]',
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserstack.user': '',
        'browserstack.key': '',

        // Needed for testing localhost
        'browserstack.local': 'false',
        'browserstack.debug': true,

        'device': 'Samsung Galaxy S5',
        'browserName': 'Android',
        'os': 'android',
        'deviceOrientation': 'portrait',
    },

    seleniumAddress: 'http://hub.browserstack.com/wd/hub',

    specs: 'e2e/features/ui/*.feature',

    framework: 'cucumber',
    cucumberOpts: {
        require: [
            'e2e/step-definitions/*.js',
            'e2e/support/*.js'
        ],
        format: 'pretty',
        tags: '@steps'
    },
    singleRun: true
};
