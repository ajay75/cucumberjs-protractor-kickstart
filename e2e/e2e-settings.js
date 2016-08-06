'use strict';

module.exports = {
	chance: require('chance').Chance(),
	baseUrl: 'https://tranquil-reef-9656.herokuapp.com',
	url: function (url) {
		return this.baseUrl + url;
	},
	correctCredentials: {
		email: 'paullittlebury@gmail.com',
		password: 'Sunshine99!@'
	},
	pages: {
		private: {
			home: '/',
			accountsettings: '/private/account-settings'
		},
		public: {
			home: '',
			registration: {
				activation: '/public/registration/activation',
				signUp: '/public/registration/sign-up',
				signUpSuccess: '/public/registration/sign-up-success'
			},
			termsOfService: '/public/terms-of-service',
			login: '/login',
			signin: ''
		}
	}
};
