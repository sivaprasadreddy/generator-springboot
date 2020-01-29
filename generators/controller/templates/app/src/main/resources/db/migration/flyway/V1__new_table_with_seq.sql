create sequence <%= entityVarName %>_id_seq start with 1 increment by 1;

create table <%= tableName %> (
    id bigint DEFAULT nextval('<%= entityVarName %>_id_seq') not null,
    text varchar(1024) not null,
    primary key (id)
);
