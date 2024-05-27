
class ProductCategoryController {
constructor(productCategoryService) {
    this.productCategoryService = productCategoryService;
  }

  addProductCategory = async (req, res) => {
    try {
      const productCategory = await this.productCategoryService.addProductCategory(req.body);
      return res.status(201).send(productCategory);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  addManyProductCategories = async (req, res) => {
    try {
      const productCategories = await this.productCategoryService.addManyProductCategory(req.body);
      return res.status(201).send(productCategories);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  getAllProductCategories = async (req, res) => {
    try {
      const productCategories = await this.productCategoryService.readAllProductCategories();
      return res.status(200).send(productCategories);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
}

export default ProductCategoryController;
