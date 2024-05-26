import * as db from '../../db/index.js';

class AddressService {
  constructor() {
    this.db = db;
  }

  addAddress = async (address, countryId) => {
    const query = `
      INSERT INTO address(
        unit_number,
        street_number,
        address_line1,
        address_line2,
        city,
        region,
        postal_code,
        country_id,
        updated_at
      ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, current_timestamp)
      RETURNING *`;

    const result = await this.db.query(
      query,
      [
        address.unitNumber,
        address.streetNumber,
        address.addressLine1,
        address.addressLine2,
        address.city,
        address.region,
        address.postalCode,
        countryId
      ]
    );
    const address = result.rows[0];
    return address;
  };

  // In the addAddress transaction:
  // - query country using country_name
  // - create address entry
  // - create user_address entry

  addAddressTransaction = async () => {

  };
}

export default AddressService;
