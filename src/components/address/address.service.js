import * as db from '../../db/index.js';

class AddressService {
  constructor(countryService, userAddressService) {
    this.db = db;
    this.countryService = countryService;
    this.userAddressService = userAddressService;
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
        Number(address.postalCode),
        countryId
      ]
    );
    const createdAddress = result.rows[0];
    return createdAddress;
  };

  addAddressTransaction = async (user, address) => {
    const client = await this.db.getClient();

    try {
      await client.query('BEGIN');

      const country = await this.countryService.getCountryByName(address.countryName);
      const createdAddress = await this.addAddress(address, country.id);
      await this.userAddressService.addUserAddress(user, createdAddress, address.isDefault);

      await client.query('COMMIT');

      return createdAddress;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    }
  };


  getAddresses = async (user) => {
    // TODO: inculude country name instead of country_id
    const query = `
      SELECT
        a.id AS address_id,
        a.unit_number,
        a.street_number,
        a.address_line1,
        a.address_line2,
        a.city,
        a.region,
        a.postal_code,
        a.country_id,
        a.created_at AS address_created_at,
        a.updated_at AS address_updated_at,
        ua.is_default
      FROM
        user_address ua
      JOIN
        address a ON ua.address_id = a.id
      WHERE
        ua.user_id = $1
    `;

    const result = await this.db.query(query, [user.id]);
    const addresses = result.rows;
    return addresses;
  };
}

export default AddressService;
