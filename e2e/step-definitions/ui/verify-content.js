'use strict';

var settings = require('../../e2e-settings');
var chai = require('chai');
chai.use(require('chai-as-promised'));
var getVariable = require('../elementmap.po.js');
var expect = chai.expect;

module.exports = function () {
	this.Then(/^I should see (.*) in the (.*) area$/, function (txt, area, callback) {
		var theArea = getVariable[area.replace(/\s+/g, '')].getText();
		expect(theArea.getText()).to.eventually.contain(txt).notify(callback);
	});

	this.Then(/^I should not see (.*) in the (.*) area$/, function (txt, area, callback) {
		expect(getVariable[area.replace(/\s+/g, '')].getText()).to.eventually.not.contain(txt).notify(callback);
	});
	this.Then(/^I should not see the (.*) area$/, function (area, callback) {
		expect(getVariable[area.replace(/\s+/g, '')].isPresent()).to.eventually.be.false.and.notify(callback);
	});

	this.Then(/^I should see the (.*) area$/, function (area, callback) {
		expect(getVariable[area.replace(/\s+/g, '')].isPresent()).to.eventually.be.true.and.notify(callback);
	});

};