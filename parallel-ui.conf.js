exports.config = {
	getPageTimeout: 3000,
	allScriptsTimeout: 500000,
	// The address of a running selenium server.
	rootElement: '[ng-app]',
	seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

	multiCapabilities: [{
		browserName: 'phantomjs',
		shardTestFiles: true,
		maxInstances: 3
	}],

	// Spec patterns are relative to the current working directly when
	// protractor is called.
	framework: 'custom',
	frameworkPath: require.resolve('protractor-cucumber-framework'),
	cucumberOpts: {
		require: [
			'e2e/step_definitions/api/*.js',
			'e2e/step_definitions/ui/*.js',
			'e2e/support/*.js'
		],
		format: 'pretty',
		tags: '@steps'
	}
};
