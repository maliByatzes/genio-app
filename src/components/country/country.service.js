import * as db from '../../db/index.js';

class CountryService {
  constructor() {
    this.db = db;
  }

  getCountryByName = async (name) => {
    const query = 'SELECT * FROM country WHERE country_name = $1 LIMIT 1';

    const result = await this.db.query(query, [name]);
    const country = result.rows[0];
    return country;
  };
}

export default CountryService;
