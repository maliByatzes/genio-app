import UserService from './user.service.js';
import UserController from './user.controller.js';
import UserRouter from './user.router.js';
import AuthService from '../auth/auth.service.js';
import AuthMiddleware from '../auth/auth.middleware.js';

const userService = new UserService();
const authService = new AuthService();
const authMiddleware = new AuthMiddleware(authService, userService);
const userController = new UserController(userService);
const userRouter = new UserRouter(userController, authMiddleware);

export default {
  router: userRouter.router,
};
