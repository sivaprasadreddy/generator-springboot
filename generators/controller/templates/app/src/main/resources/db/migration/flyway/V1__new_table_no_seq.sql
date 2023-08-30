create table <%= tableName %> (
    id bigint not null auto_increment,
    <%_ if (databaseType != 'postgresql') { _%>
    text varchar(1024) not null,
    <%_ } _%>
    <%_ if (databaseType === 'postgresql') { _%>
    text text not null,
    <%_ } _%>
    primary key (id)
);
