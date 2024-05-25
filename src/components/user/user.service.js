import * as db from '../../db/index.js';
import * as argon2 from 'argon2';

class UserService {
  constructor() {
    this.db = db;
  }

  addUser = async (user) => {
    const query = 'INSERT INTO site_user(email_address, phone_number, password, updated_at) VALUES($1, $2, $3, $4) RETURNING *';

    const hashedPassword = await argon2.hash(user.password);
    const result = await this.db.query(
      query,
      [user.emailAddress, user.phoneNumber, hashedPassword, new Date().toISOString()]
    );
    const { password, ...createdUser } = result.rows[0];
    return createdUser;
  };
}

export default UserService;
