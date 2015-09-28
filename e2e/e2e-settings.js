'use strict';

module.exports = {
  chance: require('chance').Chance(),
  baseUrl: 'http://localhost:9999',
  url: function (url) {
    return this.baseUrl + url;
  },
  pages: {
    private: {
      home: 'private/home',
      accountsettings: 'private/account-settings'
    },
    public: {
      home: 'public/home',
      registration: {
        activation: 'public/registration/activation',
        signUp: 'public/registration/sign-up',
        signUpSuccess: 'public/registration/sign-up-success'
      },
      termsOfService: 'public/terms-of-service',
      signIn: 'public/sign-in',
      forgotPassword: 'public/forgot-password',
      forgotPasswordResetLink: 'public/forgot-password-check-email',
      logout: 'public/logout',
      logoutAutomatically: 'public/logout-automatically'
    }
  }
};
