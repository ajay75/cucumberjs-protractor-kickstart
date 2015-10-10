'use strict';

var settings = require('../e2e-settings');
var chai = require('chai');

module.exports = function () {
    this.AfterScenario(function (event, callback) {
        setTimeout(callback, 5000);
    });
    this.After(function (scenario, callback) {
        if (scenario.isFailed()) {
            browser.takeScreenshot().then(function (png) {
                var decodedImage = new Buffer(png, 'base64').toString('binary');
                scenario.attach(decodedImage, 'image/png');
                callback();
            });
        }
        else {
            callback();
        }
    });
};
