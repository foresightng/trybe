class CreateCustomerRequestDTO {
  constructor({
    first_name,
    last_name,
    email,
    phone,
    ref,
    middle_name,
    sex,
    birth_date,
    bvn,
    occupation,
    city,
    residential_address,
    state,
    nationality,
    country,
    next_of_kin_name,
    next_of_kin_phone,
    proof_of_address,
  }) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.ref = ref;
    this.middle_name = middle_name;
    this.sex = sex;
    this.birth_date = birth_date;
    this.bvn = bvn;
    this.occupation = occupation;
    this.city = city;
    this.residential_address = residential_address;
    this.state = state;
    this.nationality = nationality;
    this.country = country;
    this.next_of_kin_name = next_of_kin_name;
    this.next_of_kin_phone = next_of_kin_phone;
    this.proof_of_address = proof_of_address;
  }
}

module.exports = CreateCustomerRequestDTO;
