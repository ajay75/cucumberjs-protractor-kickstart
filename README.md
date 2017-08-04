[![Build Status](https://travis-ci.org/jaffamonkey/cucumberjs-protractor-kickstart.svg?branch=master)](https://travis-ci.org/jaffamonkey/cucumberjs-protractor-kickstart) [![Known Vulnerabilities](https://snyk.io/test/github/jaffamonkey/cucumberjs-protractor-kickstart/badge.svg)](https://snyk.io/test/github/jaffamonkey/cucumberjs-protractor-kickstart)

# README

## PREP MAC/LINUX

* Install NodeJS
* npm install -g phantomjs
* npm install -g gulp
* cd /repo root folder
* node_modules/.bin/webdriver-manager update
* node_modules/.bin/webdriver-manager start

## PREP WINDOWS

* Install NodeJS
* Intsall GitSCM
* Install Visual Studio Express
* (probably good point for reboot)
* From gitbash prompt:
	* npm install -g node-gyp
	* npm install -g gulp
* node_modules/.bin/webdriver-manager update
* node_modules/.bin/webdriver-manager start
##To run headless phantomjs
    * Download window phantomjs binary
    * Extract somewhere and rename phantomjs.exe to phantomjs
    * Copy to \\Users\[user id]\AppData\Roaming\npm
    * Change browserName: 'phantomjs' in conf.js file

## How do I run tests?

### from repo root folder run:
* npm install (just once)
* Symlink to api module: ln -s node_modules/apickli/apickli-gherkin.js  e2e/step-definitions/api/apickli-gherkin.js
* Always run `export NODE_ENV={environment}` prior to running any tests (e.g. export NODE_ENV=development)
**_By default, if this value of NODE_ENV is not set before running tests, the tests will run against development url.
Currently the two settings available are 'development' and 'localhost'_**

#### API
* Run `gulp api` to run API tests

#### UI (Using webdriver)
* gulp webdriver-update
* gulp webdriver-standalone
* Run `gulp ui` to run UI tests
* Run `gulp api` to run headless-browser UI tests

### Run UI tests in parallel

* Run `gulp parallel-ui`

### Browserstack

* Run `gulp bs` for regression tests on browserstack service


**_To view the the report after running the above gulp commands, run the following gulp tasks to generate the html report._**

* gulp clean-json
* gulp protractor-report

** Or use shell scripts provided

* Run `./run_api_tests.sh` to run api tests
* Run `./run_ui_tests.sh` to run ui tests
* Run `./run_ui_tests_parallel.sh` to run ui tests in parallel mode
* Run `./run_api_tests_parallel.sh` to run api tests in parallel mode

### Run selected test with optional tag
* An optional tag can be passed during when the gulp task is invoked e.g `gulp ci --tag @tagNameHere` will only run
tests tagged with `@tagNameHere`.
* If the optional tag is missing the gulp task will run all tests set in the `{{gulTaskConfig}}.config.js` file as a fallback
