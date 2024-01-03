const axios = require('axios');

 const regCustomerOnAnchor = async (req, res) => {
    try {    
      const {} = req.body
        const options = {
            method: 'POST',
            url: 'https://api.sandbox.getanchor.co/api/v1/customers',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              'x-anchor-key': 'zYVTK.ee4a7bae6feafc0bd361603449cc4398c68e919c3f82c218923e0d48bdadb191f8255ce173a44997ed71d4deb7de2722fcdf'
            },
            data: {
              data: {
                attributes: {
                  fullName: {firstName: 'Osama', lastName: 'Okunbo'},
                  address: {
                    country: 'NG',
                    state: 'EDO',
                    addressLine_1: '31 omomo street',
                    city: 'Benin',
                    postalCode: '311123'
                  },
                  identificationLevel2: {
                    dateOfBirth: '1994-06-25',
                    gender: 'Female',
                    bvn: '22222222216',
                    selfieImage: 'bxxvxvxbvasbbxvxvx='
                  },
                  email: 'foreghtagencies@gmail.com',
                  phoneNumber: '07055476383',
                  doingBusinessAs: 'Foresig tech ageny',
                  isSoleProprietor: true,
                  description: 'bad guy sole propietor'
                },
                type: 'IndividualCustomer'
              }
            }
          };
          
          axios
            .request(options)
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.error(error);
            });

        } catch (error) {
          console.log(error)
        }
    }

    

    module.exports = {
      regCustomerOnAnchor
    }