import express from 'express';
import upload from '../../utils/upload.js';

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
      .use(upload.single('file'))
      .route('/create')
      .post(this.productController.addProduct);

    return router;
  }
};

export default ProductRouter;
