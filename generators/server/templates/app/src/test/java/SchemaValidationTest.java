package <%= packageName %>;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest(properties = {
    "spring.jpa.hibernate.ddl-auto=validate",
    "spring.test.database.replace=none",
<%_ if (databaseType === 'postgresql') { _%>
    "spring.datasource.url=jdbc:tc:postgresql:<%= POSTGRESQL_IMAGE_VERSION %>:///db"
<%_ } _%>
<%_ if (databaseType === 'mysql') { _%>
    "spring.datasource.url=jdbc:tc:mysql:<%= MYSQL_IMAGE_VERSION %>:///db"
<%_ } _%>
<%_ if (databaseType === 'mariadb') { _%>
    "spring.datasource.url=jdbc:tc:mariadb:<%= MARIADB_IMAGE_VERSION %>:///db"
<%_ } _%>
})
class SchemaValidationTest {

    @Test
    void validateJpaMappingsWithDbSchema() {
    }
}
