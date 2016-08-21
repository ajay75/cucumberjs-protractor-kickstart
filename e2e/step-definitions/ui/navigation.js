'use strict';

var settings = require('../../e2e-settings');
var chai = require('chai');
chai.use(require('chai-as-promised'));
var getVariable = require('../elementmap.po.js');
var expect = chai.expect;
var SelectWrapper = require('../../support/select-wrapper');
var currentgeneratedEmail;

module.exports = function () {
	this.Given(/^I am on the (.*) page$/, function (pagename, callback) {
		browser.get(settings.url(settings.pages.public[pagename])).then(callback);
	});

	this.When(/^I switch to iframe (.*)$/, function (arg1, callback) {
		browser.ignoreSynchronization = true;
		browser.switchTo().frame(browser.driver.findElement(By.name(arg1))).then(callback);
	});

	this.When(/^I switch away from iframe (.*)$/, function (arg1) {
		browser.driver.switchTo().defaultContent();
	});

};

function waitForElementToBePresent(elementType, elementToWaitFor) {
	var EC = protractor.ExpectedConditions;
	var elType = 'by.' + elementType;
	var el = element(elType(elementToWaitFor));
	return browser.wait(EC.visibilityOf(el));
}
