
class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  createUser = async (req, res) => {
    try {
      const createdUser = await this.userService.addUser(req.body);
      return res.status(201).send(createdUser);
    } catch (err) {
      if (err.code === '23505') {
        return res.status(409).json({ error: 'Email or phone number already exists' });
      }
      return res.status(500).json({ error: err.message });
    }
  };

  getUser = async (req, res) => {
    try {
      const res_user = res.locals.user;

      const user = await this.userService.getUser(res_user.id);
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
}

export default UserController;
