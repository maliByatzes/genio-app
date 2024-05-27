import * as db from '../../db/index.js';
import * as argon2 from 'argon2';

class UserService {
  constructor() {
    this.db = db;
  }

  addUser = async (user) => {
    const query = 'INSERT INTO site_user(email_address, phone_number, password, updated_at) VALUES($1, $2, $3, current_timestamp) RETURNING *';

    const hashedPassword = await argon2.hash(user.password);
    const result = await this.db.query(
      query,
      [user.emailAddress, user.phoneNumber, hashedPassword]
    );
    const { password, ...createdUser } = result.rows[0];
    return createdUser;
  };

  getUserByEmail = async (email) => {
    const query = 'SELECT * FROM site_user WHERE email_address = $1 LIMIT 1';

    const result = await this.db.query(query, [email]);
    const user = result.rows[0];
    return user;
  };

  getUser = async (id) => {
    const query = 'SELECT * FROM site_user WHERE id = $1 LIMIT 1';

    const result = await this.db.query(query, [id]);
    const { password, ...user } = result.rows[0];
    return user;
  };

  getUserForUpdate = async (id) => {
    const query = 'SELECT * FROM site_user WHERE id = $1 LIMIT 1 FOR UPDATE';

    const result = await this.db.query(query, [id]);
    const user = result.rows[0];
    return user;
  };

  updateUser = async (oldUser, newUser) => {
    const query = 'UPDATE site_user SET email_address = $1, phone_number = $2, password = $3, updated_at = current_timestamp WHERE id = $4 RETURNING *';

    if (newUser.password) {
      const hashedPassword = await argon2.hash(newUser.password);
      const result = await this.db.query(
        query,
        [
          newUser.emailAddress !== undefined ? newUser.emailAddress : oldUser.email_address,
          newUser.phoneNumber !== undefined ? newUser.phoneNumber : oldUser.phone_number,
          hashedPassword,
          oldUser.id
        ]
      );
      const { password, ...user } = result.rows[0];
      return user;
    } else {
      const result = await this.db.query(
        query,
        [
          newUser.emailAddress !== undefined ? newUser.emailAddress : oldUser.email_address,
          newUser.phoneNumber !== undefined ? newUser.phoneNumber : oldUser.phone_number,
          oldUser.password,
          oldUser.id
        ]
      );
      const { password, ...user } = result.rows[0];
      return user;
    }
  };

  updateUserTransaction = async (id, newUser) => {
    const client = await this.db.getClient();

    try {
      await client.query('BEGIN');

      const oldUser = await this.getUserForUpdate(id);
      const updatedUser = await this.updateUser(oldUser, newUser);

      await client.query('COMMIT');

      return updatedUser;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    }
  };
}

export default UserService;
