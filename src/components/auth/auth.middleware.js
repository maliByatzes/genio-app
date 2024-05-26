
class AuthMiddleware {
  constructor(authService, userService) {
    this.authService = authService;
    this.userService = userService;
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

      const user = await this.userService.getUser(payload.user.id);
      res.locals.user = user;
      next();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  requireUser = async (req, res, next) => {
    try {
      const user = res.locals.user;

      if (!user) {
        return res.status(401).send({ error: 'Session has expired or user doesn\'t exist' });
      }
      next();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
}

export default AuthMiddleware;
