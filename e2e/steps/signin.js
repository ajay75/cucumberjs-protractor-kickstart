'use strict';

var settings = require('../e2e-settings');
var signIn = require('../public/variables.po.js');
var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

var checkpageforelement = function (id_findelement, callback) {
    expect(element(by.binding(id_findelement)).isPresent())
        .to.eventually.equal(true)
        .and.notify(callback);
};

var container = {
    myFn: function(type, regExp, fn) {
        console.log(type +' '+regExp.toString());
    },

    Given: function(regExp, fn) {
        this.myFn('Given', regExp, fn);
    },
    Then : function(regExp, fn) {
        this.myFn('Then', regExp, fn);
    },
    When : function(regExp, fn) {
        this.myFn('When', regExp, fn);
    }
};

var steps = require('./general.js');
steps.apply(container);


module.exports = function () {
    this.Given(/^I am logged in as valid user$/, function (callback) {
        browser.get(settings.url(settings.pages.public.signIn));
        signIn.$email.sendKeys(settings.correctCredentials.email);
        signIn.$password.sendKeys(settings.correctCredentials.password);
        signIn.$submit.click();
        expect(browser.getCurrentUrl()).to.eventually.not.equal(browser.get(settings.url('public/sign-in'))).and.notify(callback);
    });

    this.Given(/^I run Cucumber with Protractor$/, function(next) {
        next();
    });
};