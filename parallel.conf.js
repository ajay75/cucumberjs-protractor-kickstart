exports.config = {
    getPageTimeout: 10000,
    allScriptsTimeout: 500000,
    // The address of a running selenium server.
    rootElement: '[ng-app]',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['feature1.feature',
        'feature2.feature'
    ],
    multiCapabilities: [{
        'browserName': 'chrome',
        shardTestFiles: true,
        maxInstances: 4,
        specs: ['e2e/features/ui/*.feature'
        ]
    }],

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    chromeOnly: false,
    baseUrl: '[enter url]',

    cucumberOpts: {
        require: [
            'e2e/step-definitions/*.js',
            'e2e/support/*.js'
        ],
        format: 'pretty',
        tags: '@torun'
    }

};