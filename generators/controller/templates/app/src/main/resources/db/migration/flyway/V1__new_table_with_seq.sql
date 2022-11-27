create sequence <%= tableName %>_seq start with 1 increment by 50;

create table <%= tableName %> (
    id bigint DEFAULT nextval('<%= tableName %>_seq') not null,
    text varchar(1024) not null,
    primary key (id)
);
