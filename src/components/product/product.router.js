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
      .route('/')
      .get(this.productController.getAllProducts);

    router
      .use(this.authMiddleware.authorize)
      .use(this.authMiddleware.requireAdmin)
      .use(upload.single('file'))
      .route('/create')
      .post(this.productController.addProduct);


    router
      .use(this.authMiddleware.authorize)
      .use(this.authMiddleware.requireAdmin)
      .route('/:id')
      .delete(this.productController.deleteOneProduct);

    return router;
  }
};

export default ProductRouter;
