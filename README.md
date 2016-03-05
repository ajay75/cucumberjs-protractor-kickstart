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
	* npm install -g node gyp
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
* Run `gulp ui` to run UI tests
* Run `gulp api` to run API tests
* To run tests headless, change browserName: 'phantomjs' in conf.js file

### Browserstack

* Run `gulp e2e:bs` for regression tests on the browserstack service

## Step definitions

#UI

* I am on the logout page
* I am on the "page name" page
* I click the "button identifier" button
* I fill in "field identifier" with "([^"]*)"
* I select "dropdown option value" from "dropdown identifier" dropdown
* I select tomorrows date from date dropdown
* I should see "expected value" in the "area identifier" area
* I should not see "expected value" in the "area identifier" area
* "count of errors" fields are displayed with error message
* I get count of all DOM elements
* I fill the form with the following data
* I should see form data
* I complete all form fields on form one
* I should see the "field identifier" field
* I should not see the "field identifier" field
* I should see value "expected value" in the "field identifier" field
* I should not see value "expected value" in the "field identifier" field
* "field identifier" field should be disabled
* I click the "field identifier" checkbox
* the correct first available time displayed

#API

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
