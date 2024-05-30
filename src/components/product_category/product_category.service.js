import * as db from '../../db/index.js';

class ProductCategoryService {
  constructor() {
    this.db = db;
  }

  addProductCategory = async (productCategory) => {
    const query = 'INSERT INTO product_category(parent_category_id, category_name, updated_at) VALUES ($1, $2, current_timestamp) RETURNING *';

    let pc;
    if (productCategory.parentCategoryName) {
      pc = await this.getProductCategoryByName(productCategory.parentCategoryName);
    }

    const result = await this.db.query(
      query,
      [
        productCategory.parentCategoryName !== undefined ? pc.id : 1,
        productCategory.categoryName
      ]
    );
    const createdProductCategory = result.rows[0];
    return createdProductCategory;
  };

  addManyProductCategory = async (productCategories) => {
    const promises = productCategories.map(productCategory => this.addProductCategory(productCategory));
    const results = await Promise.all(promises);
    return results;
  };

  getProductCategoryByName = async (name) => {
    const query = 'SELECT * FROM product_category WHERE category_name = $1 LIMIT 1';

    const result = await this.db.query(query, [name]);
    return result.rows[0];
  };

  // Delete one product category

  // Update one product category

  // Read all product categories

  readAllProductCategories = async () => {
    const query = 'SELECT * FROM product_category';

    const result = await this.db.query(query);
    return result.rows;
  };
}

export default ProductCategoryService;
