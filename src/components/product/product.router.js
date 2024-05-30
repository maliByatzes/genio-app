import express from 'express';

class ProductRouter {
  constructor(productController, authMiddleware) {
    this.productController = productController;
    this.authMiddleware = authMiddleware;
  }

  get router() {
    const router = express.Router();

    router
      .use(this.authMiddleware.authorize)
      .use(this.authMiddleware.requireAdmin)
      .route('/create')
      .post(this.productController.addProduct);

    return router;
  }
};

export default ProductRouter;
