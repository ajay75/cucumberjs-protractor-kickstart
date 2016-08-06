'use strict';

var settings = require('../e2e-settings');
var signIn = require('./elementmap.po.js');
var chai = require('chai');
var getVariable = require('./elementmap.po.js');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

module.exports = function () {
	this.Given(/^I am logged in as (.*)$/, function (userid, callback) {
		browser.get(settings.url(settings.pages.public.login));
		signIn.userid.sendKeys(userid);
		signIn.next.click();
		signIn.loginpassword.sendKeys(settings.correctCredentials.password);
		signIn.next.click().then(callback);
	});

	this.Given(/^I register a valid user$/, function (callback) {
		var emailPrefix = Math.random().toString(36).slice(2);
		var dropdownField = element.all(by.css('.ui-select-toggle')).first();
		console.log(emailPrefix);
		browser.get(settings.url(settings.pages.public.login));
		fillField('userid', emailPrefix + "@test.co.uk");
		fillField('customertitle', 'Mr');
		fillField('customerfirstname', 'Test');
		fillField('customerlastname', 'User');
		signIn.next.click();
		fillField('password', 'Sunshine99!@');
		fillField('confirmpassword', 'Sunshine99!@');
		signIn.next.click().then(callback);
		expect(browser.getCurrentUrl()).to.eventually.not.equal(browser.get(settings.url('login'))).then(callback);
	});

	this.When(/^I fill the form with the following data$/, function (table, callback) {
		var inputData;
		var fieldEl;
		var data = table.hashes();
		for (var i = 0; i < data.length; i++) {
			inputData = data[i].field;
			fieldEl = getVariable[inputData.replace(/\s+/g, '')];
			fieldEl.clear();
			var p = fieldEl.sendKeys(data[i].content);
			if (i === data.length - 1) {
				p.then(callback);
			}
		}
	});

	this.When(/^I should see updated form data$/, function (table, callback) {
		var inputData;
		var fieldEl;
		var data = table.hashes();
		for (var i = 0; i < data.length; i++) {
			inputData = 'user profile';
			fieldEl = getVariable[inputData.replace(/\s+/g, '')];
			var p = expect(fieldEl.getText()).to.eventually.contain(data[i].content);
			if (i === data.length - 1) {
				p.then(callback);
			}
		}
	});

	function fillField(fieldName, fieldValue) {
		var fieldEl = signIn[fieldName.replace(/\s+/g, '')];
		fieldEl.sendKeys(fieldValue);
	}

	function sendKeys(element, content) {
		try {
			if (element) {
				element.sendKeys(content);
			}
		} catch (e) {
		}
	}
};
