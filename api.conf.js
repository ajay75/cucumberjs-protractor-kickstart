'use strict';

exports.config = {

    rootElement: '#myApp',

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: 'e2e/features/api.feature',
    baseUrl: 'https://tranquil-reef-9656.herokuapp.com/',

    framework: 'cucumber',
    cucumberOpts: {
        require: ['e2e/step-definitions/api/*.js',
            'node_modules/apickli/apickli-gherkin.js',
            'e2e/support/*.js'
        ],
        format: 'pretty',
        tags: '@api'
    },
    maxSessions: 1,
};