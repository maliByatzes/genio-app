----------------------------------------------------
-- Migrate up
----------------------------------------------------

-- Create site_user table

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

-- Create address table

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

-- Create table country table

create table country (
  id serial not null,
  country_name varchar(100) not null,
  created_at timestamp(3) not null default current_timestamp,
  updated_at timestamp(3) not null,

  constraint country_pkey primary key (id)
);

-- Create user_address table

create table user_address (
  user_id int not null,
  address_id int not null,
  is_default boolean,
  created_at timestamp(3) not null default current_timestamp,
  updated_at timestamp(3) not null,
);

-- Create unique index

create unique index site_user_email_address_key on site_user(email_address);

-- Create unique index

create unique index site_user_phone_number_key on site_user(phone_number);

-- Add foreign key to address table

alter table address add constraint address_country_id_fkey foreign key (country_id) references country(id) on delete restrict on update cascade;

-- Add foreign key to user_address table

alter table user_address add constraint user_address_user_id foreign key (user_id) references site_user(id) on delete restrict on update cascade;

-- Add foreign key to user_address table

alter table user_address add constraint user_address_address_id foreign key (address_id) references address(id) on delete restrict on update cascade;

----------------------------------------------------
-- Migrate down
----------------------------------------------------

-- Drop foreign keys from user_address table

alter table user_address drop constraint user_address_address_id_fkey;
alter table user_address drop constraint user_address_user_id_fkey;

-- Drop foreign key from address table

alter table address drop constraint address_country_id_fkey;

-- Drop unique indexes from site_user table

drop index if exists site_user_email_address_key;
drop index if exists site_user_phone_number_key;

-- Drop user_address

drop table if exists user_address;

-- Drop address table

drop table if exists address;

-- Drop country table

drop table if exists country;

-- Drop site_user table

drop table if exists site_user;
