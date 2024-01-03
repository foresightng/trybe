// const sdk = require("api")("@curacel-grow/v1.0#1pds01apln0191ab");

// sdk.auth("1029|SS1RHiLOdmMSPmMaRWytrk9yw714kVsoPvhAVEJy");
// sdk
//   .createNewCustomer({
//     id_type: "driversLicense",
//     first_name: "David",
//     last_name: "Osuchukwu",
//     email: "isan.leonidas@deercreeks.org",
//     phone: "09018066964",
//     city: "Bonny Island",
//     residential_address: "37 Benin",
//     state: "Rivers",
//     country: "Nigeria",
//     birth_date: "1990-10-10",
//     id_expiry: "2024-10-10",
//     id_number: "173o186536",
//   })
//   .then(({ data }) => console.log(data))
//   .catch((err) => console.error(err));

// // get customers
// sdk.auth("1029|SS1RHiLOdmMSPmMaRWytrk9yw714kVsoPvhAVEJy");
// sdk
//   .fetchlistOfCustomers({
//     search: "osuchukwudavid@gmail.com",
//     page: "1",
//     per_page: "15",
//   })
//   .then(({ data }) => console.log(data))
//   .catch((err) => console.error(err));

// sdk.server("https://api.playbox.grow.curacel.co/api");
// sdk
//   .updateCustomer({ ref: "1343" })
//   .then(({ data }) => console.log(data))
//   .catch((err) => console.error(err));

// sdk.server("https://api.playbox.grow.curacel.co/api");
// sdk
//   .deleteCustomer({ ref: "1334" })
//   .then(({ data }) => console.log(data))
//   .catch((err) => console.error(err));
