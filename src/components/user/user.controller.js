

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  createUser = async (req, res) => {
    try {
      const createdUser = await this.userService.addUser(req.body);
      return res.status(201).send(createdUser);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  };
}

export default UserController;
