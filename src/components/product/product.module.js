import AuthMiddleware from "../auth/auth.middleware.js";
import AuthService from "../auth/auth.service.js";
import ProductCategoryService from "../product_category/product_category.service.js";
import UserService from "../user/user.service.js";
import ProductController from "./product.controller.js";
import ProductRouter from "./product.router.js";
import ProductService from "./product.service.js";

const userService = new UserService();
const authService = new AuthService();
const productCategoryService = new ProductCategoryService();
const productService = new ProductService(productCategoryService);
const productController = new ProductController(productService);
const authMiddleware = new AuthMiddleware(authService, userService);
const productRouter = new ProductRouter(productController, authMiddleware);

export default {
  router: productRouter.router,
};
