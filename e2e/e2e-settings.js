'use strict';

module.exports = {
	chance: require('chance').Chance(),
	baseUrl: {
		development: 'https://tranquil-reef-9656.herokuapp.com',
		localhost: 'http://localhost:9000'
	},
	url: function (url) {
		switch (process.env.NODE_ENV) {
			case 'test':
				return this.baseUrl.development + url;
			case 'development':
				return this.baseUrl.development + url;
			case 'localhost':
				return this.baseUrl.localhost + url;
		}
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
