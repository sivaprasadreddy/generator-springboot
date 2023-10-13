-- liquibase formatted sql
-- changeset author:app id:createTable-<% tableName %>
-- see https://docs.liquibase.com/concepts/changelogs/sql-format.html

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
