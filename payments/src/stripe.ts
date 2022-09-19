import Stripe from 'stripe';

export const stripe = new Stripe(
  'sk_test_51LYb3bSHEZ2ipbEoImBw8YGW3uNAVAcqmJYBDZ5tWd32EkEibvCY7wejfO0OQn1PqnMH4F2lmYgy5Rq1QQY3KaeV00BmrG3Li5',
  {
    apiVersion: '2022-08-01',
  }
);
