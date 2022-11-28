create sequence <%= tableName %>_id_seq start with 1 increment by 100;

create table <%= tableName %> (
    id bigint DEFAULT nextval('<%= tableName %>_id_seq') not null,
    text varchar(1024) not null,
    primary key (id)
);
