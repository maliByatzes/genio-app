import express from 'express';

class AddressRouter {
  constructor(addressController, authMiddleware) {
    this.addressController = addressController;
    this.authMiddleware = authMiddleware;
  }

  get router() {
    const router = express.Router();
    router
      .use(this.authMiddleware.authorize)
      .use(this.authMiddleware.requireUser)
      .route('/create')
      .post(this.addressController.createAddress);

    router
      .use(this.authMiddleware.authorize)
      .use(this.authMiddleware.requireUser)
      .route('/')
      .get(this.addressController.getAddresses);
    return router;
  }
}

export default AddressRouter;
