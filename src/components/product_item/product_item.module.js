import AuthMiddleware from "../auth/auth.middleware.js";
import AuthService from "../auth/auth.service.js";
import ProductService from "../product/product.service.js";
import UserService from "../user/user.service.js";
import ProductItemController from "./product_item.controller.js";
import ProductItemRouter from "./product_item.router.js";
import ProductItemService from "./product_item.service.js";

const userService = new UserService();
const authService = new AuthService();
const productService = new ProductService();
const productItemService = new ProductItemService(productService);
const productItemController = new ProductItemController(productItemService);
const authMiddleware = new AuthMiddleware(authService, userService);
const productItemRouter = new ProductItemRouter(productItemController, authMiddleware);

export default {
  router: productItemRouter.router,
};
