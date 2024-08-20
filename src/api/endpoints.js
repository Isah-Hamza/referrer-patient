const endpoints = {
  auth: {
    LOGIN:'login',
    REGISTER:'register',
    SETUP_PROFILE:'set-up-profile',
    FORGOT_PASSWORD:'forgot-password',
    VERIFY_OTP:'verify-otp',
    CHANGE_PASSWORD:'change-password',
  },
  bank:{
    ALL_BANKS:'bank/all',
    VERIFY_ACCOUNT:'bank/verify-account',
  },
  dashbaord:{
    ACTIVITIES:'activities',
    REBATE_EARNINGS:'rebate-earning',
    DASHBOARD_DETAILS:'dashboard-details',
  },
  referrals:{
    GET_REFERRALS:'referrals',
    GET_REFERRAL:'view-referrals',
    CREATE_REFERRAL:'add-referral',
    TEST_CATEGORIES:'categories/all',
    CATEGORY_TESTS:'medical-test/view'
  }
};

export default endpoints;
