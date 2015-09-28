'use strict';

var settings = require('../e2e-settings');

// Examples of setting variables hooks

module.exports = {
  addtrip: element(by.css('.btn-success')),
  newtripname: element(by.model('newProductName')),
  commissionpercentage: element(by.model('newProductPerc')),
  panelheading: element(by.css('.panel-heading'))
}
