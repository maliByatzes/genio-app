import express from 'express';

class UserRouter {
  constructor(userController, authMiddleware) {
    this.userController = userController;
    this.authMiddleware = authMiddleware;
  }

  get router() {
    const router = express.Router();
    router.route('/register').post(this.userController.createUser);

    router
      .use(this.authMiddleware.authorize)
      .use(this.authMiddleware.requireUser)
      .route('/me')
      .get(this.userController.getUser);

    router
      .use(this.authMiddleware.authorize)
      .use(this.authMiddleware.requireUser)
      .route('/update')
      .patch(this.userController.updateUser);
    return router;
  }
}

export default UserRouter;
