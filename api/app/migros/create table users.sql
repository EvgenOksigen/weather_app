create table users(
  id_user serial not null,
  email varchar(255) NOT NULL UNIQUE,
  first_name varchar(50) not null,
  last_name varchar(90) not null,
  father_name varchar(50),
  birth_date date,
  primary key(id_user)
)