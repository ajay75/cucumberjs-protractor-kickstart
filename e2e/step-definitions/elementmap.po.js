'use strict';

var settings = require('../e2e-settings.js');

module.exports = {
    addtrip: element(by.css('.btn-success')),
    tripname: element(by.model('newProductName')),
    trippercentage: element(by.model('newProductPerc')),
    toppanelheading: element(by.css('.panel-heading')),
    deletetrip: element(by.css('.btn-danger')),
    newesttrip: element(by.css('.panel-heading'))
}