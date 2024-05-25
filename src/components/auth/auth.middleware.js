
class AuthMiddleware {
  constructor(authService, userService) {
    this.authService = authService;
    this.authService = userService;
  }

  authorize = async (req, res, next) => {
    try {
      // TODO: get token from cookie when set
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).send({ error: 'Unauthorized' });
      }

      const [bearer, token] = authorization.split(' ');
      if (bearer !== 'Bearer') {
        return res.status(401).send({ error: 'Unauthorized' });
      }
      const { isValid, payload } = await this.authService.verifyToken(token);
      if (!isValid) {
        return res.status(401).send({ error: 'Unauthorized' });
      }

      console.log('payload: ', payload);
      // const user = await this.authService.getUser(p)

      next();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
}

export default AuthMiddleware;
