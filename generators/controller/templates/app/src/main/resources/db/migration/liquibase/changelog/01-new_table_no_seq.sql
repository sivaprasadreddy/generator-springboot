-- liquibase formatted sql
-- changeset author:app id:createTable-<% tableName %>
-- see https://docs.liquibase.com/concepts/changelogs/sql-format.html

create table <%= tableName %> (
    id bigint not null auto_increment,
    text varchar(1024) not null,
    primary key (id)
);
