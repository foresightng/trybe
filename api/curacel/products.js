// const sdk = require("api")("@curacel-grow/v1.0#1pds01apln0191ab");

// sdk.auth(process.env.CURACEL_API_KEY);

// // create customer
// sdk
//   .createNewCustomer({
//     id_type: "driversLicense",
//     first_name: "David",
//     last_name: "Osuchukwu",
//     email: "osuchukwudavid@gmail.com",
//     phone: "09018066964",
//     city: "Lagos",
//     residential_address: "37 Benin",
//     state: "Lagos",
//     country: "Nigeria",
//     birth_date: "1996-05-01",
//     id_expiry: "2040-10-10",
//     id_number: "1",
//   })
//   .then(({ data }) => console.log(data))
//   .catch((err) => console.error(err));

// // list customers
// sdk
//   .fetchlistOfCustomers({ page: "1", per_page: "15" })
//   .then(({ data }) => console.log(data))
//   .catch((err) => console.error(err));

// // fetch single customer
// sdk.server(`${CURACEL_BASE_URL}/customers/:ref`);
// sdk
//   .fetchSingleCustomer({ ref: "1029" })
//   .then(({ data }) => console.log(data))
//   .catch((err) => console.error(err));

// // products
// // list products
// sdk.listProductTypes();
// sdk
//   .server(`${CURACEL_BASE_URL}/product-types`)
//   .then(({ data }) => console.log(data))
//   .catch((err) => console.error(err));

// // list available insurance products
// sdk
//   .getProducts({
//     page: "1",
//     per_page: "20",
//     calculate_premium: "0",
//     trip_frequency: "recurring",
//   })
//   .then(({ data }) => console.log(data))
//   .catch((err) => console.error(err));

// // fetch single insurance product
// sdk.server(`${CURACEL_BASE_URL}/products/:id`);
// sdk
//   .getProductDetail({
//     asset_value: "12",
//     trip_days_per_year: "24",
//     trips_per_day: "1",
//     trip_frequency: "recurring",
//     loan_duration: "7",
//     travel_duration: "10",
//     calculate_premium: "0",
//     age: "24",
//     id: "1029",
//   })
//   .then(({ data }) => console.log(data))
//   .catch((err) => console.error(err));

// // product purchase
