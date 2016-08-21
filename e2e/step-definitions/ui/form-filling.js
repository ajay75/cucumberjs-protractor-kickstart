'use strict';

var settings = require('../../e2e-settings');
var chai = require('chai');
var getVariable = require('../elementmap.po.js');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

module.exports = function () {

	this.When(/^I fill the form with the following data$/, function (table, callback) {
		var data = table.hashes();
		for (var i = 0; i < data.length; i++) {
			var inputData = data[i].field;
			var fieldEl = getVariable[inputData.replace(/\s+/g, '')];
			//fieldEl.clear();
			var p = fieldEl.sendKeys(data[i].content);
			if (i === data.length - 1) {
				p.then(callback);
			}
		}
	});

	this.When(/^I complete the contact form with valid data$/, function (callback) {
		var data = [{field: 'contact tel', content: '02043434343'},
			{field: 'contact mobile', content: '079460000000'},
			{field: 'contact email', content: 'sadsdas@dsdasd.com'},
			{field: 'contact notes', content: 'some notes in here'},
			{field: 'contact addressline1', content: '43'},
			{field: 'contact addressline2', content: 'High Street'},
			{field: 'contact addressline3', content: 'London'},
			{field: 'contact addressline4', content: 'Middlesex'},
			{field: 'contact postcode', content: 'E1 3BG'},
			{field: 'contact alt addressline1', content: '43'},
			{field: 'contact alt addressline2', content: 'High Street'},
			{field: 'contact alt addressline3', content: 'London'},
			{field: 'contact alt addressline4', content: 'Middlesex'},
			{field: 'contact alt postcode', content: 'E1 3BG'}];
		for (var i = 0; i < data.length; i++) {
			var inputData = data[i].field;
			var fieldEl = getVariable[inputData.replace(/\s+/g, '')];
			fieldEl.clear();
			var p = fieldEl.sendKeys(data[i].content);
			if (i === data.length - 1) {
				p.then(callback);
			}
		}
	});

	this.Then(/^the (.*) button state is (.*)$/, function (buttonName, buttonState) {
		return expect(getVariable[buttonName.replace(/\s+/g, '')].isEnabled()).to.eventually.equal(buttonState);
	});

	this.Given(/^I click the (.*) (button|filter|radio|tab|checkbox)$/, function (buttonName, buttonType) {
		return getVariable[buttonName.replace(/\s+/g, '')].click();
	});

	this.When(/^I click the following checkboxes$/, function (table, callback) {
		var data = table.hashes();
		for (var i = 0; i < data.length; i++) {
			var inputData = data[i].checkbox;
			var fieldEl = getVariable[inputData.replace(/\s+/g, '')];
			var p = fieldEl.click();
			if (i === data.length - 1) {
				p.then(callback);
			}
		}
	});

	this.Given(/^I check all checkboxes$/, function () {
		return element(by.model('ctrl.allRecordsChecked')).click();
	});

	this.Given(/^I check all checkboxes on recommendation section$/, function (callback) {
		var maxloop = 6;
		for (var i = 0; i < maxloop; i++) {
			var p = element.all(by.css('[type="checkbox"]')).get(i).click();
			if (i === 5) {
				p.then(callback);
			}
		}
	});

	this.Given(/^I fill in (.*) with (.*)$/, function (fieldName, fieldValue) {
		var fieldEl = getVariable[fieldName.replace(/\s+/g, '')];
		return fieldEl.sendKeys(fieldValue);
	});

	this.Given(/^I select (.*) from (.*)$/, function (fieldValue, fieldName, callback) {
		var dropdownField = getVariable[fieldName.replace(/\s+/g, '')];
		sendKeys(dropdownField, fieldValue);
		dropdownField.sendKeys(protractor.Key.TAB).then(callback);
	});

	this.Given(/^I choose (.*) from the dropdown (.*)$/, function (fieldValue, fieldName, callback) {
		element(by.css('.ui-select-toggle')).click().then(function () {
			var dropdownField = getVariable[fieldName.replace(/\s+/g, '')];
			sendKeys(dropdownField, fieldValue);
			dropdownField.sendKeys(protractor.Key.TAB).then(callback);
		});
	});

	this.When(/^I reset the (.*) field$/, function (fieldName) {
		var fieldEl = getVariable[fieldName.replace(/\s+/g, '')];
		return fieldEl.clear();
	});


	this.Given(/^I should see updated form data$/, function (table, callback) {
		var data = table.hashes();
		for (var i = 0; i < data.length; i++) {
			var inputData = data[i].field;
			var fieldEl = getVariable[inputData.replace(/\s+/g, '')];
			var p = expect(fieldEl.getText()).to.eventually.contain(data[i].content);
			if (i === data.length - 1) {
				p.notify(callback);
			}
		}
	});

	function fillField(fieldName, fieldValue) {
		var fieldEl = getVariable[fieldName.replace(/\s+/g, '')];
		fieldEl.clear();
		return fieldEl.sendKeys(fieldValue);
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
