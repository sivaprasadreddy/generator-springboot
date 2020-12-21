create table <%= tableName %> (
    id bigint not null auto_increment,
    text varchar(1024) not null,
    primary key (id)
);
