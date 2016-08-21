'use strict';

var settings = require('../../e2e-settings');
var signIn = require('../elementmap.po.js');
var chai = require('chai');
var getVariable = require('../elementmap.po.js');
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

	this.Given(/^I login with with non-angular facebook popup$/, function () {
		browser.getAllWindowHandles().then(function (handles) {
			var buttonName = 'fb login';
			browser.switchTo().window(handles[1]);
			browser.ignoreSynchronization = true;
			fillField('facebook id', 'paul.littlebury@test.co.uk');
			fillField('facebook password', 'Sunshinee@');
			return getVariable[buttonName.replace(/\s+/g, '')].click().then(function () {
				browser.switchTo().window(handles[0]);
				browser.ignoreSynchronization = false;
			});
		});
		var fieldName = 'login success';
		return expect(getVariable[fieldName.replace(/\s+/g, '')].isPresent()).to.eventually.equal(true);
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
