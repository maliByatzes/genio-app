import UserService from "../user/user.service.js";
import AuthController from "./auth.controller.js";
import AuthRouter from "./auth.router.js";
import AuthService from "./auth.service.js";

const authService = new AuthService();
const userService = new UserService();
const authController = new AuthController(authService, userService);
const authRouter = new AuthRouter(authController);

export default {
  router: authRouter.router,
};
