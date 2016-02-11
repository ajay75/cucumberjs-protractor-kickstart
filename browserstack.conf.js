'use strict';

// An example configuration file.
exports.config = {
    rootElement: '#myApp',
    // Capabilities to be passed to the webdriver instance.
    multiCapabilities: [{
        'browserstack.user': '[browserstack USERNAME]',
        'browserstack.key': '[browserstack KEY]',

        // Needed for testing localhost
        'browserstack.local': 'true',
        'browserstack.debug': true,

        'device': 'Samsung Galaxy S5',
        'browserName': 'Android',
        'os': 'android',
        'deviceOrientation': 'portrait',
    },
        {
            'browserstack.user': '[browserstack USERNAME]',
            'browserstack.key': '[browserstack KEY]',

            // Needed for testing localhost
            'browserstack.local': 'true',
            'browserstack.debug': true,

            // Settings for the browser you want to test
            'browserName': 'Chrome',
            'browser_version': '36.0',
            'os': 'OS X',
            'os_version': 'Mavericks',
            'resolution': '1024x768'
        }
    ],

    seleniumAddress: 'http://hub.browserstack.com/wd/hub',

    specs: 'e2e/features/**/*.feature',

    framework: 'cucumber',
    cucumberOpts: {
        require: [
            'e2e/step-definitions/*.js',
            'e2e/support/*.js'
        ],
        format: 'pretty',
        tags: '@step-definitions'
    },
    singleRun: true,
};
