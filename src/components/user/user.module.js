import UserService from './user.service.js';
import UserController from './user.controller.js';
import UserRouter from './user.router.js';

const userService = new UserService();
const userController = new UserController(userService);
const userRouter = new UserRouter(userController);

export default {
  router: userRouter.router,
};
