import * as db from '../../db/index.js';

class UserAddressService {
  constructor() {
    this.db = db;
  }

  addUserAddress = async (user, address, isDefault = undefined) => {
    const query = 'INSERT INTO user_address(user_id, address_id, is_default, updated_at) VALUES ($1, $2, $3, current_timestamp)';

    await this.db.query(
      query,
      [user.id, address.id, isDefault !== undefined ? isDefault : false]
    );
  }

  getUserAddressForUpdate = async (user, address) => {
    const query = 'SELECT * FROM user_address WHERE user_id = $1 AND address_id = $2 LIMIT 1 FOR NO KEY UPDATE';

    const result = await this.db.query(
      query,
      [user.id, address.id]
    );
    const user_address = result.rows[0];
    return user_address;
  };

  updateUserAddress = async (user_address, isDefault = undefined) => {
    const query = 'UPDATE user_address SET is_default = $1 WHERE user_id = $2 AND address_id = $3 RETURNING *';

    const result = await this.db.query(
      query,
      [
        isDefault !== undefined ? isDefault : user_address.is_default,
        user_address.user_id,
        user_address.address_id
      ]
    );
    const userAddress = result.rows[0];
    return userAddress;
  };

  deleteUserAddress = async (user_address) => {
    const query = 'DELETE FROM user_address WHERE user_id = $1 AND address_id = $2';

    await this.db.query(query, [user_address.user_id, user_address.address_id]);
  };
}

export default UserAddressService;
