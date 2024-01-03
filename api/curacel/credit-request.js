const sdk = require('api')('@curacel-grow/v1.0#1pds01apln0191ab');

sdk.auth(process.env.CURACEL_API_KEY);

sdk.addCreditRequest({
  customer: {
    ref: '1029',
    email: 'osuchukwudavid@gmail.com',
    phone: '09018066964',
    first_name: 'David',
    last_name: 'Osuchukwu'
  },
  ref: '1029',
  total_amount_paid: 29000,
  item_original_price: 29000,
  narration: 'TRF_AU'
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));