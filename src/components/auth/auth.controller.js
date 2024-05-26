
class AuthController {
  constructor(authService, userService) {
    this.authService = authService;
    this.userService = userService;
  }

  login = async (req, res) => {
    try {
      const { emailAddress, password } = req.body;
      const user = await this.userService.getUserByEmail(emailAddress);
      const { isValid, jwt } = await this.authService.login(user, password);
      if (isValid) {
        // TODO: set two cookies of jwt token and is user logged
        return res.status(200).send({ jwt });
      }
      return res.status(401).send({ error: 'Invalid email or password' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  // TODO: implement logout handler
}

export default AuthController;
