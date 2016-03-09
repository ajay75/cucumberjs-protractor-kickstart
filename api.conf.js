'use strict';

exports.config = {
    rootElement: '#myApp',
    specs: 'e2e/features/api/*.feature',
    baseUrl: '[enter url]',

    framework: 'cucumber',
    cucumberOpts: {
        require: ['e2e/step-definitions/api/*.js',
            'node_modules/apickli/apickli-gherkin.js',
            'e2e/support/*.js'
        ],
        format: 'json',
        tags: '@api'
    },
    maxSessions: 50,
};