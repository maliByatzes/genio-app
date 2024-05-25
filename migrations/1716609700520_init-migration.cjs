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
    create table site_user (
      id serial not null,
      email_address varchar(100) not null,
      phone_number varchar(20),
      password text not null,
      user_type varchar(10) not null default 'user',
      created_at timestamp(3) not null default current_timestamp,
      updated_at timestamp(3) not null,

      constraint site_user_pkey primary key (id)
    );

    create table address (
      id serial not null,
      unit_number varchar(20),
      street_number varchar(20),
      address_line1 varchar(100),
      address_line2 varchar(100),
      city varchar(100),
      region varchar(100),
      postal_code int,
      country_id int not null,
      created_at timestamp(3) not null default current_timestamp,
      updated_at timestamp(3) not null,

      constraint address_pkey primary key (id)
    );

    create table country (
      id serial not null,
      country_name varchar(100) not null,
      created_at timestamp(3) not null default current_timestamp,
      updated_at timestamp(3) not null,

      constraint country_pkey primary key (id)
    );

    create table user_address (
      user_id int not null,
      address_id int not null,
      is_default boolean,
      created_at timestamp(3) not null default current_timestamp,
      updated_at timestamp(3) not null
    );

    create unique index site_user_email_address_key on site_user(email_address);
    create unique index site_user_phone_number_key on site_user(phone_number);

    alter table address add constraint address_country_id_fkey foreign key (country_id) references country(id) on delete restrict on update cascade;

    alter table user_address add constraint user_address_user_id_fkey foreign key (user_id) references site_user(id) on delete restrict on update cascade;

    alter table user_address add constraint user_address_address_id_fkey foreign key (address_id) references address(id) on delete restrict on update cascade;
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql(`
    alter table user_address drop constraint user_address_address_id_fkey;
    alter table user_address drop constraint user_address_user_id_fkey;

    alter table address drop constraint address_country_id_fkey;

    drop index if exists site_user_email_address_key;
    drop index if exists site_user_phone_number_key;

    drop table if exists user_address;

    drop table if exists address;

    drop table if exists country;

    drop table if exists site_user;
  `);
};
