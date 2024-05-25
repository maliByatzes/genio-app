import express from 'express';

class UserRouter {
  constructor(userController) {
    this.userController = userController;
  }

  get router() {
    const router = express.Router();
    router.route('/register').post(this.userController.createUser);
    return router;
  }
}

export default UserRouter;
