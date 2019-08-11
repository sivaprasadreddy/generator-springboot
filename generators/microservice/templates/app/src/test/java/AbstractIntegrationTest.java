package <%= packageName %>;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.test.context.ContextConfiguration;
<%_ if (databaseType === 'mariadb') { _%>
import org.testcontainers.containers.MariaDBContainer;
<%_ } _%>
<%_ if (databaseType === 'mysql') { _%>
import org.testcontainers.containers.MySQLContainer;
<%_ } _%>
<%_ if (databaseType === 'postgresql') { _%>
import org.testcontainers.containers.PostgreSQLContainer;
<%_ } _%>
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@SpringBootTest(webEnvironment = RANDOM_PORT)
@ContextConfiguration(initializers = {AbstractIntegrationTest.Initializer.class})
@Testcontainers
public abstract class AbstractIntegrationTest {

    <%_ if (databaseType === 'postgresql') { _%>
    @Container
    public static PostgreSQLContainer sqlContainer = new PostgreSQLContainer("postgres:10.7")
            .withDatabaseName("integration-tests-db")
            .withUsername("sa")
            .withPassword("sa");
    <%_ } _%>
    <%_ if (databaseType === 'mysql') { _%>
    @Container
    public static MySQLContainer sqlContainer = new MySQLContainer("mysql:5.7.22")
            .withDatabaseName("integration-tests-db")
            .withUsername("sa")
            .withPassword("sa");
    <%_ } _%>
    <%_ if (databaseType === 'mariadb') { _%>
    @Container
    public static MariaDBContainer sqlContainer = new MariaDBContainer("mariadb:10.3.6")
            .withDatabaseName("integration-tests-db")
            .withUsername("sa")
            .withPassword("sa");
    <%_ } _%>

    static class Initializer
            implements ApplicationContextInitializer<ConfigurableApplicationContext> {
        public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
            TestPropertyValues.of(
                    "spring.datasource.url=" + sqlContainer.getJdbcUrl(),
                    "spring.datasource.username=" + sqlContainer.getUsername(),
                    "spring.datasource.password=" + sqlContainer.getPassword()
            ).applyTo(configurableApplicationContext.getEnvironment());
        }
    }
}
