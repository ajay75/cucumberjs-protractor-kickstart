'use strict';

var settings = require('../e2e-settings');

// Examples of setting variables hooks

module.exports = {
  companyaddress: element(by.css('.e2e__address')),
  companycity: element(by.css('.e2e__city')),
  companycountry: element(by.css('.e2e__country')),
  companypostcode: element(by.css('.e2e__postcode')),
  companyprofile: element(by.binding('my-tnt.account-settings.company-profile.title')),
  companyprofilenotification: element(by.css('.content-block__contents')),
  companyReceiver: element.all(by.css('.e2e__company-name')).last(),
  companySender: element.all(by.css('.e2e__company-name')).first(),
  confirmandpay: element(by.css('button[type="submit"]')),
  finalisepayment: element(by.binding('my-tnt.shipment-confirmation.submit')),
  goodsdescription: element(by.model('results.description'))
}
