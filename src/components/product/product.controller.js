import { uploadProductImage } from "../../utils/firebase.js";

class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  addProduct = async (req, res) => {
    try {
      const imageUrl = await uploadProductImage(req.file);
      console.log(imageUrl);

      const newProduct = {
        ...req.body,
        productImageURL: imageUrl,
      };

      console.log(newProduct);

      const product = await this.productService.addProductTransaction(newProduct);
      return res.status(201).send(product);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
}

export default ProductController;
