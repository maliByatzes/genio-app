import * as db from '../../db/index.js';

class ProductService {
  constructor(productCategoryService) {
    this.db = db;
    this.productCategoryService = productCategoryService;
  }

  addProduct = async (newProduct, productCategory) => {
    const query = 'INSERT INTO product(category_id, name, description, product_image, updated_at) VALUES($1, $2, $3, $4, current_timestamp) RETURNING *';

    const result = await this.db.query(
      query,
      [
        productCategory.id,
        newProduct.name,
        newProduct.description,
        newProduct.productImageURL
      ]
    );
    return result.rows[0];
  };

  addProductTransaction = async (newProduct) => {
    const client = await this.db.getClient();

    try {
      await client.query('BEGIN');

      const productCategory = await this.productCategoryService.getProductCategoryByName(newProduct.productCategoryName);
      const product = await this.addProduct(newProduct, productCategory);

      await client.query('COMMIT');

      return product;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    }
  };

  readAllProducts = async () => {
    const query = 'SELECT * FROM product';

    const result = await this.db.query(query);
    return result.rows;
  };

  deleteOneProduct = async (id) => {
    const query = 'DELETE FROM product WHERE id = $1';

    const result = await this.db.query(query, [id]);
    return result.rows[0];
  };
}

export default ProductService;
