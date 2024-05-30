import { uploadProductImage } from "../../utils/firebase.js";

class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  addProduct = async (req, res) => {
    try {
      const imageUrl = await uploadProductImage(req.file);

      const newProduct = {
        ...req.body,
        productImageURL: imageUrl,
      };

      const product = await this.productService.addProductTransaction(newProduct);
      return res.status(201).send(product);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  getAllProducts = async (req, res) => {
    try {
      const products = await this.productService.readAllProducts();
      return res.status(200).send(products);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  deleteOneProduct = async (req, res) => {
    try {
      const { id } = req.params;
      await this.productService.deleteOneProduct(id);
      return res.status(200).json({ message: "success" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
}

export default ProductController;
