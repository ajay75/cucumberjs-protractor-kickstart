'use strict';

module.exports = {
  chance: require('chance').Chance(),
  baseUrl: 'http://tnt:demo_or_die@mytnt-master.dev.infra-prod.tnt-proddev.com/',
  url: function (url) {
    return this.baseUrl + url;
  },
  pages: {
    private: {
      home: 'private/home',
      accountsettings: 'private/account-settings',
      companyprofile: 'private/account-settings/company-profile',
      companyprofileinprogress: '/private/account-settings/company-profile?status=inprogress',
      companyprofilesuccess: '/private/account-settings/company-profile?status=success',
      companyprofiledenied: '/private/account-settings/company-profile?status=denied'
    },
    public: {
      home: 'public/home',
      createShipping: {
        createShippingSender: 'private/create-shipment/',
      },
      createNewPassword: {
        validStatusUrl: 'public/create-new-password/thistokenisvalid',
        invalidStatusUrl: 'public/create-new-password-invalid',
        expiredStatusUrl: 'public/create-new-password-expired',
        usedStatusUrl: 'public/create-new-password-used'
      },
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
