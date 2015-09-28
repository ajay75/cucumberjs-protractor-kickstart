'use strict';

var settings = require('../e2e-settings');
var chai = require('chai');

module.exports = function () {
    this.AfterScenario(function (event, callback) {
        setTimeout(callback, 3000);
    });
};
