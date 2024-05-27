import * as db from '../../db/index.js';

class ProductCategoryService {
  constructor() {
    this.db = db;
  }

  // Add one product category

  addProductCategory = async (productCategory) => {
    const query = 'INSERT INTO product_category(parent_category_id, category_name, updated_at) VALUES ($1, $2, current_timestamp) RETURNING *';

    const result = await this.db.query(
      query,
      [
        productCategory.parentCategoryId !== undefined ? productCategory.parentCategoryId : 1,
        productCategory.categoryName
      ]
    );
    const createdProductCategory = result.rows[0];
    return createdProductCategory;
  };

  // Add many product categories

  addManyProductCategory = async (productCategories) => {
    const promises = productCategories.map(productCategory => this.addProductCategory(productCategory));
    const results = await Promise.all(promises);
    return results;
  };

  // Delete one product category

  // Update one product category

  // Read all product categories

  readAllProductCategories = async () => {
    const query = 'SELECT * FROM product_category';

    const result = this.db.query(query);
    return result.rows;
  };
}

export default ProductCategoryService;
