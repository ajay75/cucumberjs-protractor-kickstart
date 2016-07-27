'use strict';

var settings = require('../e2e-settings');
var chai = require('chai');
chai.use(require('chai-as-promised'));
var getVariable = require('./elementmap.po.js');
var expect = chai.expect;
var SelectWrapper = require('../support/select-wrapper');
var currentgeneratedEmail;

module.exports = function () {
    this.Given(/^I am on the "([^"]*)" page$/, function (pagename, callback) {
        browser.get(settings.url(settings.pages.public[pagename])).then(callback);
    });

    this.Given(/^I am on "([^"]*)"$/, function (destUrl, callback) {
        var currentUrl = settings.baseUrl + destUrl;
        browser.get(settings.baseUrl + destUrl).then(function (url) {
            expect(browser.getCurrentUrl()).to.eventually.equal(currentUrl).and.notify(callback);
        });
    });

    this.Given(/^I click the "([^"]*)" (button|checkbox|tab)$/, function (fieldname, buttontype) {
            return getVariable[fieldname.replace(/\s+/g, '')].click();
    });

    this.Given(/^I click "([^"]*)"$/, function (fieldname, callback) {
        expect(getVariable[fieldname.replace(/\s+/g, '')].isPresent()).to.eventually.equal(true).then(function () {
            getVariable[fieldname.replace(/\s+/g, '')].click().then(callback);
        });
    });

    this.Then(/^I should see the "([^"]*)" field$/, function (elementName, callback) {
        expect(getVariable[elementName.replace(/\s+/g, '')].isPresent()).to.eventually.equal(true).and.notify(callback);
    });

    this.Then(/^I should see total price multiplied by "([^"]*)"$/, function (arg1) {
        var newtotal = '£' + (singledealprice * arg1);
        var fieldName = 'total price';
        var totalPrice = getVariable[fieldName.replace(/\s+/g, '')];
        chai.assert(totalPrice, newtotal);
    });

    this.Given(/^I click first deal in search results$/, function () {
        return element(by.css('.deal-sm')).click();
    });

    this.Given(/^I wait for payment gateway$/, function () {
        var EC = protractor.ExpectedConditions;
        var el = element(by.css('[aria-disabled="false"]'));
        return browser.wait(EC.visibilityOf(el));
    });

    this.When(/^I switch to iframe "([^"]*)"$/, function (arg1, callback) {
        browser.ignoreSynchronization = true;
        browser.switchTo().frame(browser.driver.findElement(By.name(arg1))).then(callback);
    });

    this.When(/^I switch away from iframe "([^"]*)"$/, function (arg1) {
        browser.driver.switchTo().defaultContent();
    });

    this.Given(/^I wait for search results$/, function () {
        waitForElementToBePresent('css', '.search-results')
    });

    this.Given(/^I wait for subscription modal to load$/, function () {
        var EC = protractor.ExpectedConditions;
        var el = element(by.model('modal.formValues.email'));
        return browser.wait(EC.not(EC.presenceOf(el)));
    });

    this.Given(/^I login with with non-angular facebook popup$/, function () {
        browser.getAllWindowHandles().then(function (handles) {
            var buttonName = 'fb login';
            browser.switchTo().window(handles[1]);
            browser.ignoreSynchronization = true;
            fillField('facebook id', 'paul.littlebury@test.co.uk');
            fillField('facebook password', 'Sunshinee@');
            return getVariable[buttonName.replace(/\s+/g, '')].click().then(function () {
                browser.switchTo().window(handles[0]);
                browser.ignoreSynchronization = false;
            });
        });
        var fieldName = 'login success';
        return expect(getVariable[fieldName.replace(/\s+/g, '')].isPresent()).to.eventually.equal(true);
    });

    this.Given(/^I fill in "([^"]*)" with "([^"]*)"$/, function (fieldName, fieldValue, callback) {
        if (fieldValue == 'randomemail') {
            enterRandomEmail(fieldName);
            expect(getVariable[fieldName.replace(/\s+/g, '')].isPresent()).to.eventually.equal(true).and.notify(callback);
        }
        else {
            fillField(fieldName, fieldValue);
            expect(getVariable[fieldName.replace(/\s+/g, '')].isPresent()).to.eventually.equal(true).and.notify(callback);
        }
    });

    this.Given(/^I fill in dropdown "([^"]*)" with "([^"]*)"$/, function (fieldName, fieldValue) {
        var fieldEl = getVariable[fieldName.replace(/\s+/g, '')];
        fieldEl.sendKeys(fieldValue);
    });


    this.Given(/^I fill in "([^"]*)" with the newly created email id$/, function (fieldName, callback) {
        fillField(fieldName, currentgeneratedEmail);
        callback();
    });

    this.Given(/^I select "([^"]*)" from "([^"]*)" dropdown$/, function (fieldValue, fieldName, callback) {
        var dropdownField = getVariable[fieldName.replace(/\s+/g, '')];
        dropdownField.click();
        element.all(by.css('.ui-select-choices-row-inner')).first().click().then(callback);
    });

    this.Given(/^I select "([^"]*)" from "([^"]*)"$/, function (fieldValue, fieldName, callback) {
        var dropdownField = getVariable[fieldName.replace(/\s+/g, '')];
        sendKeys(dropdownField, fieldValue);
        dropdownField.sendKeys(protractor.Key.TAB).then(callback);
    });

    this.Given(/^I select "([^"]*)" from dropdown "([^"]*)"$/, function (ddValue, ddName, callback) {
        var ddCss = getVariable[ddName.replace(/\s+/g, '')];
        var mySelect = new SelectWrapper(by.css(ddCss));
        sendKeys(mySelect, ddValue);
        mySelect.selectByLabel(ddValue).then(callback);
    });

    this.Then(/^I should see "([^"]*)" in the "([^"]*)" area$/, function (txt, area, callback) {
        var theArea = getVariable[area.replace(/\s+/g, '')].getText();
        expect(theArea.getText()).to.eventually.contain(txt).then(function () {
            callback();
        });
    });

    this.Then(/^I should not see "([^"]*)" in the "([^"]*)" area$/, function (txt, area, callback) {
        expect(getVariable[area.replace(/\s+/g, '')].getText()).to.eventually.not.contain(txt).then(function () {
            callback();
        });
    });
    this.Then(/^I should not see the "([^"]*)" area$/, function (area, callback) {
        expect(getVariable[area.replace(/\s+/g, '')].isPresent()).to.eventually.be.false.and.notify(callback);
    });

    this.Then(/^I should see the "([^"]*)" area$/, function (area, callback) {
        expect(getVariable[area.replace(/\s+/g, '')].isPresent()).to.eventually.be.true.and.notify(callback);
    });

};


function enterRandomEmail(fieldName) {
    var emailPrefix = Math.random().toString(36).slice(2);
    var fieldValue2 = emailPrefix + "@test.co.uk";
    console.log(fieldValue2);
    fillField(fieldName, fieldValue2);
    currentgeneratedEmail = fieldValue2;
}

function fillField(fieldName, fieldValue) {
    var fieldEl = getVariable[fieldName.replace(/\s+/g, '')];
    fieldEl.clear();
    fieldEl.sendKeys(fieldValue);
}

function clear(elem, length) {
    length = length || 100;
    var backspaceSeries = '';
    for (var i = 0; i < length; i++) {
        backspaceSeries += protractor.Key.BACK_SPACE;
    }
    elem.sendKeys(backspaceSeries);
}

function sendKeys(element, content) {
    try {
        if (element) {
            element.sendKeys(content);
        }
    } catch (e) {
    }
}

function waitForElementToBePresent(elementType, elementToWaitFor) {
    var EC = protractor.ExpectedConditions;
    var elType = 'by.' + elementType;
    var el = element(elType(elementToWaitFor));
    return browser.wait(EC.visibilityOf(el));
}

function waitForUrlToChangeTo(urlRegex) {
    var currentUrl;
    return browser.getCurrentUrl().then(function storeCurrentUrl(url) {
            currentUrl = url;
        }
    ).then(function waitForUrlToChangeTo() {
            return browser.wait(function waitForUrlToChangeTo() {
                return browser.getCurrentUrl().then(function compareCurrentUrl(url) {
                    return urlRegex.test(url);
                });
            });
        }
    );
}
