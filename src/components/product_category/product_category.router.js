import express from 'express';

class ProductCategoryRouter {
  constructor(productCategoryController, authMiddleware) {
    this.productCategoryController = productCategoryController;
    this.authMiddleware = authMiddleware;
  }

  get router() {
    const router = express.Router();

    router
      .use(this.authMiddleware.authorize)
      .use(this.authMiddleware.requireAdmin)
      .route('/create')
      .post(this.productCategoryController.addProductCategory);


    router
      .use(this.authMiddleware.authorize)
      .use(this.authMiddleware.requireAdmin)
      .route('/create-many')
      .post(this.productCategoryController.addManyProductCategories);

    router
      .use(this.authMiddleware.authorize)
      .use(this.authMiddleware.requireAdmin)
      .route('/')
      .get(this.productCategoryController.getAllProductCategories);

    return router;
  }
}

export default ProductCategoryRouter;
