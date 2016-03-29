[![Build Status](https://travis-ci.org/jaffamonkey/cucumberjs-protractor-kickstart.svg?branch=master)](https://travis-ci.org/jaffamonkey/cucumberjs-protractor-kickstart)

# README

## PREP MAC/LINUX

* Install NodeJS
* npm install -g phantomjs
* npm install -g gulp
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
* Run `gulp ui` to run UI tests
* Run `gulp api` to run API tests
* To run tests headless, change browserName: 'phantomjs' in conf.js file

### Run UI tests in parallel

* Run `gulp parallel`

### Run API tests in parallel

* node_modules/cucumber-parallel/bin/cucumber-parallel e2e/features/api -r e2e/step-definitions/api --tags=@api --parallel scenarios -f json:report.json
* gulp parallel:report

### Browserstack

* Run `gulp e2e:bs` for regression tests on browserstack service
