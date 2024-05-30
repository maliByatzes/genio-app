import { initTestDb } from '../../setupTestDb.js';
import UserService from './user.service';

let pool;
let userService;
let usersToAdd;

beforeAll(async () => {
  const testDb = await initTestDb();
  pool = testDb.pool;

  userService = new UserService();
  // TODO: use fakerjs
  usersToAdd = [
    { emailAddress: 'user1@example.com', phoneNumber: '012345678', password: 'secret1' },
    { emailAddress: 'user2@example.com', phoneNumber: '985865828', password: 'secret2' },
    { emailAddress: 'user3@example.com', phoneNumber: '876553456', password: 'secret3' },
  ];

  usersToAdd.forEach((user) => {
    userService.addUser(user);
  });
});

afterAll(async () => {
  await pool.end();
});

describe('UserService', () => {
  describe('addUser', () => {
    it('should add new user to the db', () => {
      const createdUser = { emailAddress: 'user4@example.com', phoneNumber: '98766234', password: 'secret4' };
      userService.addUser(createdUser);

      const user = userService.getUserByEmail(createdUser.emailAddress);

      expect(user.length).toBe(1);
      expect(user.email_address).toEqual(createdUser.emailAddress);
      expect(user.phone_number).toEqual(createdUser.phoneNumber);
    });
  });
});
