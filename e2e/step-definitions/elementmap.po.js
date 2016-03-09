'use strict';

var settings = require('../e2e-settings.js');

module.exports = {
    addtrip: element(by.css('.btn-success')),
    tripname: element(by.model('newProductName')),
    trippercentage: element(by.model('newProductPerc')),
    panelheading: element(by.css('.panel-heading'))
}