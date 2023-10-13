-- liquibase formatted sql
-- changeset author:app id:createTable-<% tableName %>
-- see https://docs.liquibase.com/concepts/changelogs/sql-format.html

create sequence <%= tableName %>_seq start with 1 increment by 50;

create table <%= tableName %> (
    <%_ if (databaseType != 'mariadb') { _%>
    id bigint DEFAULT nextval('<%= tableName %>_seq') not null,
    <%_ } _%>
    <%_ if (databaseType === 'mariadb') { _%>
    id bigint DEFAULT nextval(`<%= tableName %>_seq`) not null,
    <%_ } _%>
    <%_ if (databaseType != 'postgresql') { _%>
    text varchar(1024) not null,
    <%_ } _%>
    <%_ if (databaseType === 'postgresql') { _%>
    text text not null,
    <%_ } _%>
    primary key (id)
);
