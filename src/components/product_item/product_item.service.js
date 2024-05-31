import * as db from '../../db/index.js';

class ProductItemService {
  constructor(productService) {
    this.db = db;
    this.productService = productService;
  }

  addProductItem = async (newProductItem, product) => {
    const query = 'INSERT INTO product_item(product_id, sku, quantity, product_image, price, updated_at) VALUES($1, $2, $3, $4, $5, current_timestamp) RETURNING *';

    const result = await this.db.query(
      query,
      [
        product.id,
        newProductItem.sku,
        newProductItem.quantity,
        newProductItem.productImageURL,
        newProductItem.price
      ]
    );
    return result.rows[0];
  };

  addProductItemTransaction = async (newProductItem) => {
    const client = await this.db.getClient();

    try {
      await client.query('BEGIN');

      const product = await this.productService.getProductByName(newProductItem.productName);
      const productItem = await this.addProductItem(newProductItem, product);

      await client.query('COMMIT');

      return productItem;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    }
  };

  readAllProductItems = async () => {
    const query = `
      SELECT pi.id,
             p.name AS product_name,
             pc.category_name AS product_catgory,
             pi.sku,
             pi.quantity,
             pi.product_image,
             pi.price,
             pi.created_at,
             pi.updated_at
      FROM product_item pi
      INNER JOIN product ON pi.product_id = p.id
      INNER JOIN product_category pc ON p.category_id = pc.id;
    `;

    const result = await this.db.query(query);
    return result.rows;
  };

  readOneProductItem = async (id) => {
    const query = `
      SELECT pi.id,
             p.name AS product_name,
             pc.category_name AS product_catgory,
             pi.sku,
             pi.quantity,
             pi.product_image,
             pi.price,
             pi.created_at,
             pi.updated_at
      FROM product_item pi
      INNER JOIN product ON pi.product_id = p.id
      INNER JOIN product_category pc ON p.category_id = pc.id
      WHERE pi.id = $1
      LIMIT 1;
    `;

    const result = await this.db.query(query, [id]);
    return result.rows[0];
  };

  deleteOneProductItem = async (id) => {
    const query = 'DELETE FROM product_item WHERE id = $1';

    const result = await this.db.query(query, [id]);
    return result.rows[0];
  };
}

export default ProductItemService;
