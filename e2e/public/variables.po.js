'use strict';

var settings = require('../e2e-settings');

// Examples of setting variables hooks

module.exports = {
  addmultiplepackages: element(by.binding('my-tnt.package-list.add-line')),
  addressSender: element(by.css('.address-sender')),
  agreement: element(by.css('.agreement')),
  caneditcompanyprofile: element(by.css('link--cancel')),
  collectionDate: element(by.css('.collection-date')),
  collectionfrom: element.all(by.id('from')).first(),
  companyaddress: element(by.css('.e2e__address')),
  companycity: element(by.css('.e2e__city')),
  companycountry: element(by.css('.e2e__country')),
  companypostcode: element(by.css('.e2e__postcode')),
  companyprofile: element(by.binding('my-tnt.account-settings.company-profile.title')),
  companyprofilenotification: element(by.css('.content-block__contents')),
  companyReceiver: element.all(by.css('.e2e__company-name')).last(),
  companySender: element.all(by.css('.e2e__company-name')).first(),
  confirmandpay: element(by.css('button[type="submit"]')),
  confirmationcancel: element.all(by.binding('my-tnt.shipment-confirmation.cancel')).last(),
  contactNameReceiver: element.all(by.css('.e2e__contact-name')).last(),
  contactNameSender: element.all(by.css('.e2e__contact-name')).first(),
  continue: element(by.binding('my-tnt.account-settings.company-profile.confirm-cancel-dialog.ok-button')),
  continueshippingconfirmation: element(by.binding('my-tnt.shipment-confirmation.submit')),
  countryCodeReceiver: element(by.css('.country-code-receiver')),
  countryCodeSender: element(by.css('.selectize-dropdown-content')),
  countryList: element(by.css('.selectize-dropdown-content')),
  countryReceiver: element(by.css('.country-receiver')),
  countryReceiverDropdown: element.all(by.css('.selectize-input')).last(),
  countryReceiverInput: element.all(by.css('.e2e__country')).last(),
  countryReceiverList: element.all(by.css('ul.autocomplete')).last(),
  countrySender: element(by.css('.country-sender')),
  countrySenderDropdown: element.all(by.css('.selectize-input')).first(),
  countrySenderInput: element.all(by.css('.e2e__country')).first(),
  countrySenderList: element.all(by.css('ul.autocomplete')).first(),
  createshipping: element(by.css('.button--blue')),
  dangerousgoods: element(by.css('nobr.ng-binding')),
  dangerousgoodsarea: element(by.name('goodsDescription')),
  deliveryinsurance: element(by.binding('my-tnt-quote-options.insurance.description')),
  editcompanyprofile: element(by.css('button[type="button"]')),
  savecompanyprofile: element(by.css('button[type="button"]')),
  envelopecontents: element(by.id('product-type')),
  errormessage: element(by.css('.alert__icon')),
  errormessages: element.all(by.css('.alert-message')).first(),
  finalisepayment: element(by.binding('my-tnt.shipment-confirmation.submit')),
  firstdeliveryservice: element(by.binding('my-tnt.quote-selector.fastest')),
  goodsdescription: element(by.model('results.description')),
  goodsdescriptionrequired: element(by.name('goodsDescription')),
  inputTos: element(by.css('label.e2e__terms_and_conditions')),
  insurance: element(by.css('.insurance')),
  itemheight: element(by.id('height')),
  itemlength: element(by.id('length')),
  itemweight: element(by.id('weight')),
  itemwidth: element(by.id('width')),
  insurancevalue: element(by.id('shipmentInsuranceValue')),
  no: element(by.css('.no')),
  packageType: element(by.css('.package-type')),
  packagetype: element(by.id('type')),
  packagetypesizes: element(by.css('.selected')),
  paymentoptions: element(by.id('payment-options')),
  paymentprompt: element(by.css('h2')),
  paymentsummary: element(by.css('.content-wrapper')),
  pickupTimeFrom: element(by.css('.pickupTimeFrom')),
  pickupTimeTo: element(by.css('.pickupTimeTo')),
  postalCodeReceiver: element.all(by.css('.e2e__postcode')).last(),
  postalCodeSender: element.all(by.css('.e2e__postcode')).first(),
  priority: element(by.css('.priority')),
  profilecompanyaddress: element(by.css('.e2e__address')),
  profilecompanycontact: element(by.css('.e2e__contact-name')),
  profilecompanyemail: element(by.css('.e2e__contact-email')),
  profilecompanyname: element(by.css('.e2e__company-name')),
  profilecompanytelephone: element(by.css('.e2e__contact-phone')),
  profilecompanyvat: element(by.css('.e2e__vat-number')),
  profilecontactname: element(by.id('formly_3_input_contact-name_7')),
  profileupdatenotification: element(by.css('.messageText')),
  receiverCity: element.all(by.css('.e2e__city')).last(),
  receiverEmailAddress: element.all(by.css('.e2e__contact-email')).last(),
  receiverInstructions: element.all(by.css('.e2e__instructions')).last(),
  receiverStreetAddress: element.all(by.css('.e2e__address')).last(),
  receiverTelephoneNumber: element.all(by.css('.e2e__contact-phone')).last(),
  receiverVatNumber: element.all(by.css('.e2e__vat-number')).last(),
  requestcompanyprofilechangeapproval: element(by.css('button[type="button"]')),
  saveShipmentAddresses: element(by.css('button[type="submit"]')),
  senderCity: element.all(by.css('.e2e__city')).first(),
  senderEmailAddress: element.all(by.css('.e2e__contact-email')).first(),
  senderInstructions: element.all(by.css('.e2e__instructions')).first(),
  senderStreetAddress: element.all(by.css('.e2e__address')).first(),
  senderTelephoneNumber: element.all(by.css('.e2e__contact-phone')).first(),
  senderVatNumber: element.all(by.css('.e2e__vat-number')).first(),
  shipmentcurrency: element(by.css('.label__roster')),
  shipmentvalue: element(by.name('value')),
  shippingSubmit: element(by.css('button[type="submit"]')),
  shippingvaluerequired: element(by.name('goodsDescription')),
  signmeup: element(by.css('button[type="submit"]')),
  signUpConfirmationText: element(by.binding('my-tnt.registration.sign-up-success.page.header')),
  stateReceiver: element(by.css('.state-receiver')),
  stateSender: element(by.css('.state-sender')),
  unavailabletimes: element(by.binding('my-tnt-quote-options.not-available')),
  addressReceiver: element(by.css('.address-receiver'))
}