# README

## PREP MAC/LINUX

* Install NodeJS
* npm install -g webdriver-manager
* npm install -g phantomjs
* npm install -g gulp
* webdriver-manager update
* webdriver-manager start

## PREP WINDOWS

* Install NodeJS
* Intsall GitSCM
* Install Visual Studio Express
* (probably good point for reboot)
* From gitbash prompt:
	* npm install -g node-gyp
	* npm install -g webdriver-manager
	* npm install -g gulp
	* webdriver-manager update
	* webdriver-manager start
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

* Note: you may need to set proxy for api tests, so run the following:
        * export http_proxy='http://anl-iron-proxy:80'
        * export https_proxy='http://anl-iron-proxy:80'

### Run UI tests in parallel

* Run `gulp parallel`

### Run API tests in parallel

* node_modules/cucumber-parallel/bin/cucumber-parallel e2e/features/api -r e2e/step-definitions/api --tags=@api --parallel scenarios -f json:report.json
* gulp parallel:report

### Browserstack

* Run `gulp e2e:bs` for regression tests on the browserstack service

## API Step definitions

* I set (.*) header to (.*)
* I set body to (.*)
* I pipe contents of file (.*) to body
* I have basic authentication credentials (.*) and (.*)
* I set bearer token
* I GET $resource
* I POST to $resource
* I PUT $resource
* I DELETE $resource
* response header (.*) should exist
* response header (.*) should not exist
* response body should be valid (xml|json)
* response code should be (\d+)
* response code should not be (\d+)
* response header (.*) should be (.*)
* response header (.*) should not be (.*)
* response body should contain (.*)
* response body should not contain (.*)
* response body path (.*) should be (.*)
* response body path (.*) should not be (.*)
* I store the value of body path (.*) as access token
* I store the value of * response header (.*) as (.*) in scenario scope
* I store the value of body path (.*) as (.*) in scenario scope
* value of scenario variable (.*) should be (.*)
* I store the value of * response header (.*) as (.*) in global scope
* I store the value of body path (.*) as (.*) in global scope