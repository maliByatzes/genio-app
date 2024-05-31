import { uploadProductImage } from "../../utils/firebase.js";

class ProductItemController {
  constructor(productItemService) {
    this.productItemService = productItemService;
  }

  addProductItem = async (req, res) => {
    try {
      const imageUrl = await uploadProductImage(req.file);

      const newProductItem = {
        ...req.body,
        productImageURL: imageUrl,
      };

      const productItem = await this.productItemService.addProductItemTransaction(newProductItem);
      return res.status(201).send(productItem);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  getAllProductItems = async (req, res) => {
    try {
      const productItems = await this.productItemService.readAllProductItems();
      return res.status(200).send(productItems);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  getProductItemById = async (req, res) => {
    try {
      const productItem = await this.productItemService.readProductItemById(req.params.id);
      return res.status(200).send(productItem);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  deleteProductItemById = async (req, res) => {
    try {
      await this.productItemService.deleteProductItemById(req.params.id);
      return res.status(204).send({ message: 'success' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
}

export default ProductItemController;
