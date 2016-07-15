exports.config = {
    getPageTimeout: 10000,
    allScriptsTimeout: 500000,
    // The address of a running selenium server.
    rootElement: '[ng-app]',
    seleniumAddress: 'http://localhost:4444/wd/hub',

    multiCapabilities: [{
        'browserName': 'chrome',
        shardTestFiles: true,
        maxInstances: 3,
        specs: ['e2e/features/ui/*.feature'
        ]
    }],

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: 'e2e/features/ui/*.feature',
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        require: [
            'e2e/step-definitions/*.js',
            'e2e/support/*.js'
        ],
        format: 'pretty',
        tags: '@ui'
    },
};
