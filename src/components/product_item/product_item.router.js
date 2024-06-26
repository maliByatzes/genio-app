import express from 'express';
import upload from '../../utils/upload.js';

class ProductItemRouter {
  constructor(productItemController, authMiddleware) {
    this.productItemController = productItemController;
    this.authMiddleware = authMiddleware;
  }

  get router() {
    const router = express.Router();

    router
      .route('/')
      .get(this.productItemController.getAllProductItems);

    router
      .use(this.authMiddleware.authorize)
      .use(this.authMiddleware.requireAdmin)
      .use(upload.single('file'))
      .route('/create')
      .post(this.productItemController.addProductItem);

    router
      .route('/:id')
      .get(this.productItemController.getProductItemById);

    router
      .use(this.authMiddleware.authorize)
      .use(this.authMiddleware.requireAdmin)
      .route('/:id')
      .delete(this.productItemController.deleteProductItemById);

    return router;
  }
}

export default ProductItemRouter;
