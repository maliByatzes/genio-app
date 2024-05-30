
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

  deleteOneProductCategory = async (req, res) => {
    try {
      const { id } = req.params;
      await this.productCategoryService.deleteOneProductCategory(id);
      return res.status(200).send({ message: 'success' });
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

  getOneProductCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const pc = await this.productCategoryService.getOneProductCategoryById(id);
      return res.status(200).send(pc);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
}

export default ProductCategoryController;
