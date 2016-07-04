'use strict';

var settings = require('../e2e-settings.js');

module.exports = {
    addtrip: element(by.css('.btn-success')),
    tripname: element(by.model('newProductName')),
    trippercentage: element(by.model('newProductPerc')),
    toppanelheading: element.all(by.css('.panel-heading')).first(),
    deletetrip: element(by.css('i.btn:nth-child(2)')),
    increasecommission: element(by.css('input.form-control:nth-child(2)')),
    tripcommissionheading: element(by.css('th.ng-binding'))
}