import AuthMiddleware from "../auth/auth.middleware.js";
import ProductCategoryController from "./product_category.controller.js";
import ProductCategoryService from "./product_category.service.js";
import AuthService from "../auth/auth.service.js";
import UserService from "../user/user.service.js";
import ProductCategoryRouter from "./product_category.router.js";

const productCategoryService = new ProductCategoryService();
const productCategoryController = new ProductCategoryController(productCategoryService);
const authService = new AuthService();
const userService = new UserService();
const authMiddleware = new AuthMiddleware(authService, userService);
const productCategoryRouter = new ProductCategoryRouter(productCategoryController, authMiddleware);

export default {
  router: productCategoryRouter.router,
};
