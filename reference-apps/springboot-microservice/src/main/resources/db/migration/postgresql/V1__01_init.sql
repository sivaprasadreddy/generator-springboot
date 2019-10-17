create sequence user_id_seq start with 1 increment by 1;
create sequence role_id_seq start with 1 increment by 1;

create table users (
    id bigint DEFAULT nextval('user_id_seq') not null,
    email varchar(255) not null CONSTRAINT user_email_unique UNIQUE,
    password varchar(255) not null,
    name varchar(255) not null,
    created_at timestamp,
    updated_at timestamp,
    primary key (id)
);

create table roles (
    id bigint DEFAULT nextval('role_id_seq') not null,
    name varchar(255) not null CONSTRAINT role_name_unique UNIQUE,
    created_at timestamp,
    updated_at timestamp,
    primary key (id)
);

create table user_role (
    user_id bigint not null REFERENCES users(id),
    role_id bigint not null REFERENCES roles(id)
);


INSERT INTO roles (id, name, created_at) VALUES
(1, 'ROLE_ADMIN', CURRENT_TIMESTAMP),
(2, 'ROLE_USER', CURRENT_TIMESTAMP)
;

INSERT INTO users (email, password, name, created_at) VALUES
('admin@gmail.com', '$2a$10$ZuGgeoawgOg.6AM3QEGZ3O4QlBSWyRx3A70oIcBjYPpUB8mAZWY16', 'Admin', CURRENT_TIMESTAMP),
('siva@gmail.com', '$2a$10$CIXGKN9rPfV/mmBMYas.SemoT9mfVUUwUxueFpU3DcWhuNo5fexYC', 'Siva',  CURRENT_TIMESTAMP),
('prasad@gmail.com', '$2a$10$vtnCx8LxraSbveB26Lth3.s/.9hI1SFHwCFTSlAkAlVRybva6GQo6', 'Prasad',  CURRENT_TIMESTAMP)
;

INSERT INTO user_role (user_id, role_id) VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 2)
;
