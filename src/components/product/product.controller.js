import { uploadProductImage } from "../../utils/firebase.js";

class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  addProduct = async (req, res) => {
    try {
      let imageData;
      let contentType;
      const { productImage } = req.body;

      if (productImage && typeof productImage === 'string' && productImage.startsWith('data:')) {
        const parts = productImage.split(';base64,');
        contentType = parts[0].split(':')[1];
        imageData = Buffer.from(parts[1], 'base64');
      }

      const productImageURL = uploadProductImage(imageData, contentType);

      const newProduct = {
        ...req.body,
        productImageURL,
      };

      const product = await this.productService.addProductTransaction(newProduct);
      return res.status(201).send(product);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
}

export default ProductController;
