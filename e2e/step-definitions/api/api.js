/* jslint node: true */
'use strict';

var apickli = require('apickli');
var createdEmail;

module.exports = function () {
	// cleanup before every scenario
	this.Before(function () {
		switch (process.env.NODE_ENV) {
			case 'test':
				return this.apickli = new apickli.Apickli('http', 'httpbin.org');
			case 'development':
				return this.apickli = new apickli.Apickli('http', 'httpbin.org');
			case 'localhost':
				return this.apickli = new apickli.Apickli('http', 'localhost');
		}
	});

	this.Then(/^I create random registration details$/, function (callback) {
		var emailPrefix = Math.random().toString(36).slice(2);
		var randomemail = emailPrefix + "@test.co.uk";
		this.apickli.setGlobalVariable(randomemail);
		createdEmail = randomemail;
		this.apickli.setRequestBody('{"requestRegistration": {"title": "Mr","firstName": "AbcFn2","surname": "DefLn2", "addressLine1": "12 Swan Lane","addressLine2": "Islington","city": "London","postCode": "N1 1SD","email":"' + randomemail + '","emailConfirmation": "' + randomemail + '","password": "Sunshine99!@","passwordConfirmation": "Sunshine99!@","rejectDMGTContact": "false","location": "London","subscriptionSource": "abc"}}')
		callback();
	});

	this.Then(/^I am using newly registered customer login details$/, function (callback) {
		this.apickli.addHttpBasicAuthorizationHeader(createdEmail, 'Sunshine99!@');
		callback();
	});

	this.Then(/^I create and buy a voucher$/, function (callback) {
		//var currentBalance = this.apickli.getGlobalVariable(currentWalletBalance);
		var currentBalance = this.apickli.scenarioVariables['currentWalletBalance'];
		console.log(currentBalance);
		var xmlBody = '<requestOrderProcessing><order><location>Bradford</location><containsGift></containsGift><walletUsed>true</walletUsed><walletBalance>' + currentBalance + '</walletBalance><orderLines><orderLine><dealVoucherProductId>144087</dealVoucherProductId><quantity>1</quantity></orderLine></orderLines></order></requestOrderProcessing>';
		this.apickli.setRequestBody(xmlBody);
		this.apickli.post('/payment/create-and-buy-order', callback);
	});

	this.Then(/^I print out response$/, function (callback) {
		console.log(this.apickli.getResponseObject().body);
		//console.log(currentBal);
		callback();
	});

};