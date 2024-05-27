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
create table product (
  id serial not null,
  category_id int not null, -- FK
  name varchar(100) not null,
  description text,
  product_image text,
  created_at timestamp(3) not null default current_timestamp,
  updated_at timestamp(3) not null,

  constraint product_pkey primary key (id)
);

create table product_item (
  id serial not null,
  product_id int not null, -- FK
  sku varchar(100) not null,
  quantity int not null,
  product_image text,
  price numeric(5, 2) not null,
  created_at timestamp(3) not null default current_timestamp,
  updated_at timestamp(3) not null,

  constraint product_item_pkey primary key (id)
);

create table product_category (
  id serial not null,
  parent_category_id int not null, -- FK
  category_name varchar(100) not null,
  created_at timestamp(3) not null default current_timestamp,
  updated_at timestamp(3) not null,

  constraint product_category_pkey primary key (id)
);

create table promotion (
  id serial not null,
  name varchar(100) not null,
  description text,
  discount_rate decimal,
  start_date date,
  end_date date,
  created_at timestamp(3) not null default current_timestamp,
  updated_at timestamp(3) not null,

  constraint promotion_pkey primary key (id)
);

create table promotion_category (
  category_id int not null, -- FK
  promotion_id int not null, -- FK
  created_at timestamp(3) not null default current_timestamp,
  updated_at timestamp(3) not null
);

create table variation (
  id serial not null,
  category_id int not null, -- FK
  name varchar(100) not null,
  created_at timestamp(3) not null default current_timestamp,
  updated_at timestamp(3) not null,

  constraint variation_pkey primary key (id)
);

create table variation_option (
  id serial not null,
  variation_id int not null, -- FK
  value varchar not null,
  created_at timestamp(3) not null default current_timestamp,
  updated_at timestamp(3) not null,

  constraint variation_option_pkey primary key (id)
);

create table product_configuration (
  product_item_id int not null, --FK
  variation_option_id int not null, -- FK
  created_at timestamp(3) not null default current_timestamp,
  updated_at timestamp(3) not null
);

alter table product add constraint product_category_id_fkey foreign key (category_id) references product_category (id) on delete restrict on update cascade;

alter table product_item add constraint product_item_product_id_fkey foreign key (product_id) references product (id) on delete restrict on update cascade;

alter table product_category add constraint product_category_parent_category_id_fkey foreign key (parent_category_id) references product_category (id) on delete restrict on update cascade;

alter table promotion_category add constraint promotion_category_category_id_fkey foreign key (category_id) references product_category (id) on delete restrict on update cascade;
alter table promotion_category add constraint promotion_category_promotion_id_fkey foreign key (promotion_id) references promotion (id) on delete restrict on update cascade;

alter table variation add constraint variation_category_id_fkey foreign key (category_id) references product_category (id) on delete restrict on update cascade;

alter table variation_option add constraint variation_option_variation_id_fkey foreign key (variation_id) references variation (id) on delete restrict on update cascade;

alter table product_configuration add constraint product_configuration_product_item_id_fkey foreign key (product_item_id) references product_item (id) on delete restrict on update cascade;
alter table product_configuration add constraint product_configuration_variation_option_id_fkey foreign key (variation_option_id) references variation_option (id) on delete restrict on update cascade;

  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql(`
alter table product_configuration drop constraint product_configuration_product_item_id_fkey;
alter table product_configuration drop constraint product_configuration_variation_option_id_fkey;

alter table variation_option drop constraint variation_option_variation_id_fkey;

alter table variation drop constraint variation_category_id_fkey;

alter table promotion_category drop constraint promotion_category_category_id_fkey;
alter table promotion_category drop constraint promotion_category_promotion_id_fkey;

alter table product_category drop constraint product_category_parent_category_id_fkey;

alter table product_item drop constraint product_item_product_id_fkey;

alter table product drop constraint product_category_id_fkey;

drop table if exists product_configuration;
drop table if exists variation_option;
drop table if exists variation;
drop table if exists promotion_category;
drop table if exists promotion;
drop table if exists product_category;
drop table if exists product_item;
drop table if exists product;
  `);
};
