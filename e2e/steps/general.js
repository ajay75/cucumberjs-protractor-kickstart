'use strict';

var settings = require('../e2e-settings');
var chai = require('chai');
chai.use(require('chai-as-promised'));
var getVariable = require('../public/variables.po.js');
var expect = chai.expect;
var SelectWrapper  = require('../support/select-wrapper');

module.exports = function () {
  this.Then(/^I am on the logout page$/, function () {
    return browser.get(settings.url('public/logout'));
  });

  this.Given(/^I am on the "([^"]*)" page$/, function (pagename, callback) {
    var elName = 'h1';
    browser.get(settings.url(settings.pages.public.createShipping[pagename]));
    checkpageforcsselement(elName, callback);
  });

  this.Given(/^I click the "([^"]*)" button$/, function (fieldname, callback) {
    getVariable[fieldname.replace(/\s+/g, '')].click().then(callback);
  });

  this.Given(/^I fill in "([^"]*)" with "([^"]*)"$/, function (fieldName, fieldValue, callback) {
    getVariable[fieldName.replace(/\s+/g, '')].clear();
    sendKeys(getVariable[fieldName.replace(/\s+/g, '')], fieldValue);
    expect(getVariable[fieldName.replace(/\s+/g, '')].isPresent()).to.eventually.be.true.and.notify(callback);
  });

  this.Given(/^I select "([^"]*)" from "([^"]*)" dropdown$/, function (fieldValue, fieldName, callback) {
    var dropdownField = getVariable[fieldName.replace(/\s+/g, '')];
    sendKeys(dropdownField, fieldValue);
    dropdownField.sendKeys(protractor.Key.TAB);
    expect(getVariable[fieldName.replace(/\s+/g, '')].isPresent()).to.eventually.be.true.and.notify(callback);
  });

  this.Given(/^I select tomorrows date from date dropdown$/, function (callback) {
    var tomorrow = new Date();
    var newdate = new Date();
    var month = (newdate.getMonth()+1);
    newdate.setDate(tomorrow.getDate() + 1);
    var converteddate =  toString('MMMM dS');
    var mySelect = new SelectWrapper(by.id('date'));
    mySelect.selectByValue(converteddate);
    expect(element(by.id('date')).isPresent()).to.eventually.be.true.and.notify(callback);
  });


  this.Then(/^I should see "([^"]*)" in the "([^"]*)" area$/, function (txt, area, callback) {
    expect(getVariable[area.replace(/\s+/g, '')].getText()).to.eventually.contain(txt).and.notify(callback);
  });


  this.Then(/^I should not see "([^"]*)" in the "([^"]*)" area$/, function (txt, area, callback) {
    expect(getVariable[area.replace(/\s+/g, '')].getText()).to.eventually.not.contain(txt).and.notify(callback);
  });

  this.Then(/^"([^"]*)" fields are displayed with error message$/, function (numOfErrors, callback) {
    expect(element.all(by.css('.ng-invalid-required')).count()).to.eventually.equal(parseInt(numOfErrors)).and.notify(callback);

  });

  this.Then(/^I get count of all DOM elements$/, function () {
    var allDomElements = element.all(by.css('*')).count();
    console.log(allDomElements)
  });

  this.When(/^I fill the form with the following data$/, function (table, callback) {
    var inputData;
    var fieldEl;
    var data = table.hashes();
    for (var i = 0; i < data.length; i++) {
      inputData = data[i].field;
      fieldEl = getVariable[inputData.replace(/\s+/g, '')];
      fieldEl.clear();
      var p = fieldEl.sendKeys(data[i].content);
      if (i === data.length - 1) {
        p.then(callback);
      }
    }
  });

  this.When(/^I should see form data$/, function (table, callback) {
    var data = table.hashes();
    for (var i = 0; i < data.length; i++) {
      var inputData = data[i].field;
      var inputContent = data[i].content;
      var p = expect(element(by.css('div.layout.box--push')).getText()).to.eventually.contain(inputContent);
      if (i === data.length - 1) {
        p.and.notify(callback);
      }

    }
  });

  this.When(/^I complete all form fields on form one$/, function (callback) {
    var data = [{field: 'field one', content: 'field value'},
      {field: 'field two', content: 'field value'},
      {field: 'field three', content: 'field value'}];
    for (var i = 0; i < data.length; i++) {
      var inputData = data[i].field;
      var fieldEl = getVariable[inputData.replace(/\s+/g, '')];
      var p = fieldEl.sendKeys(data[i].content);
      if (i === data.length - 1) {
        p.then(callback);
      }
    }
  });


  this.Then(/^I should see the "([^"]*)" field$/, function (elementName, callback) {
    //var elementNameParsed = getVariable[elementName.replace(/\s+/g, '')];
    expect(getVariable[elementName.replace(/\s+/g, '')].isPresent()).to.eventually.equal(true).and.notify(callback);
  });

  this.Then(/^I should not see the "([^"]*)" field$/, function (elementName, callback) {
    expect(getVariable[elementName.replace(/\s+/g, '')].isPresent()).to.eventually.equal(false).and.notify(callback);
  });

  this.Then(/^I should see value "([^"]*)" in the "([^"]*)" field$/, function (texttoFind, fieldRef, callback) {
    expect(getVariable[fieldRef.replace(/\s+/g, '')].getText())
      .to.eventually.contain(texttoFind)
      .and.notify(callback);
  });

  this.Then(/^I should not see value "([^"]*)" in the "([^"]*)" field$/, function (texttoFind, fieldRef, callback) {
    expect(getVariable[fieldRef.replace(/\s+/g, '')].getText())
      .to.eventually.not.contain(texttoFind)
      .and.notify(callback);
  });

  this.Given(/^"([^"]*)" field should be disabled$/, function (fieldId, callback) {
    expect(getVariable[fieldId.replace(/\s+/g, '')].isEnabled()).to.eventually.equal(false).and.notify(callback);
  });

  this.Given(/^I click the "([^"]*)" checkbox$/, function (linkName, callback) {
    var checkboxName = getVariable[linkName.replace(/\s+/g, '')];
    getVariable[linkName.replace(/\s+/g, '')].click();
    expect(checkboxName.isPresent()).to.eventually.be.true.and.notify(callback);
  });

  this.Given(/^the correct first available time displayed$/, function (callback) {
    var minutes;
    var currentdate = new Date();
    var hour = currentdate.getHours();
    var minutes2 = currentdate.getMinutes();
    if ((minutes2 >= 30 || minutes2 < 30) && (hour > 16 || hour < 7)) {
      if (hour > 16 || hour < 7) {
        hour = "08";
        minutes = "30";
      }
      else {
        hour = hour + 1;
        minutes = "30";
      }
    }
    var firstCollectionTime = (hour + ":" + minutes);
    console.log(firstCollectionTime);
    var area = element(by.id('from'));
    expect(area.getText()).to.eventually.contain(firstCollectionTime).and.notify(callback);
  });

};

var checkpageforcsselement = function (id_findelement, callback) {
  expect(element(by.css(id_findelement)).isPresent())
    .to.eventually.equal(true)
    .and.notify(callback);
};

function sendKeys(element, content) {
  try {
    if (element) {
      element.sendKeys(content);
    }
  } catch (e) {
  }
}
