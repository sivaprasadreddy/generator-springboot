package <%= packageName %>.common;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
<%_ if (databaseType === 'postgresql') { _%>
import org.testcontainers.containers.PostgreSQLContainer;
<%_ } _%>
<%_ if (databaseType === 'mysql') { _%>
import org.testcontainers.containers.MySQLContainer;
<%_ } _%>
<%_ if (databaseType === 'mariadb') { _%>
import org.testcontainers.containers.MariaDBContainer;
<%_ } _%>

@Slf4j
public class DBContainerInitializer
        implements ApplicationContextInitializer<ConfigurableApplicationContext> {

<%_ if (databaseType === 'postgresql') { _%>
    private static final PostgreSQLContainer<?> sqlContainer =
            new PostgreSQLContainer<>("<%= POSTGRESQL_IMAGE %>")
                    .withDatabaseName("integration-tests-db")
                    .withUsername("username")
                    .withPassword("password");
<%_ } _%>
<%_ if (databaseType === 'mysql') { _%>
    private static final MySQLContainer<?> sqlContainer =
            new MySQLContainer<>("<%= MYSQL_IMAGE %>")
                    .withDatabaseName("integration-tests-db")
                    .withUsername("username")
                    .withPassword("password");
<%_ } _%>
<%_ if (databaseType === 'mariadb') { _%>
    private static final MariaDBContainer<?> sqlContainer =
            new MariaDBContainer<>("<%= MARIADB_IMAGE %>")
                    .withDatabaseName("integration-tests-db")
                    .withUsername("username")
                    .withPassword("password");
<%_ } _%>

    static {
        sqlContainer.start();
    }

    public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
        TestPropertyValues.of(
                        "spring.datasource.url=" + sqlContainer.getJdbcUrl(),
                        "spring.datasource.username=" + sqlContainer.getUsername(),
                        "spring.datasource.password=" + sqlContainer.getPassword())
                .applyTo(configurableApplicationContext.getEnvironment());
    }
}
