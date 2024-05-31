/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.sql(`
create table shopping_cart (
  id serial not null,
  user_id int not null,

  constraint shopping_cart_pkey primary key (id)
);

create table shopping_cart_item (
  id serial not null,
  cart_id int not null,
  product_item_id int not null,
  quantity int not null,

  constraint shopping_cart_item_pkey primary key (id)
);

alter table shopping_cart add constraint shopping_cart_user_id_fkey foreign key (user_id) references site_user(id) on delete restrict on update cascade;

alter table shopping_cart_item add constraint shopping_cart_item_cart_id_fkey foreign key (cart_id) references shopping_cart(id) on delete restrict on update cascade;
alter table shopping_cart_item add constraint shopping_cart_item_product_item_id_fkey foreign key (product_item_id) references product_item(id) on delete restrict on update cascade;
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql(`
alter table shopping_cart_item drop constraint shopping_cart_item_cart_id_fkey;
alter table shopping_cart_item drop constraint shopping_cart_item_product_item_id_fkey;
alter table shopping_cart drop constraint shopping_cart_user_id_fkey;
drop table if exists shopping_cart_item;
drop table if exists shopping_cart;
  `);
};
