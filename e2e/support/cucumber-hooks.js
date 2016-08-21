'use strict';

var settings = require('../e2e-settings');
var chai = require('chai');

module.exports = function () {
	this.setDefaultTimeout(10 * 1000);

	this.After(function (scenario) {
		browser.manage().deleteAllCookies();
	});

	this.After(function (scenario, callback) {
		if (scenario.isFailed()) {
			browser.takeScreenshot().then(function (png) {
				var decodedImage = new Buffer(png.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
				scenario.attach(decodedImage, 'image/png');
				callback();
			});
		}
		else {
			callback();
		}
	});
};
