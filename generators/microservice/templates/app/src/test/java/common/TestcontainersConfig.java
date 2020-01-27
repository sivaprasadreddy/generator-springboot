package <%= packageName %>.common;

import org.junit.jupiter.api.BeforeAll;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.context.annotation.Profile;
<%_ if (databaseType === 'mariadb') { _%>
import org.testcontainers.containers.MariaDBContainer;
<%_ } _%>
<%_ if (databaseType === 'mysql') { _%>
import org.testcontainers.containers.MySQLContainer;
<%_ } _%>
<%_ if (databaseType === 'postgresql') { _%>
import org.testcontainers.containers.PostgreSQLContainer;
<%_ } _%>

import static <%= packageName %>.utils.Constants.PROFILE_DOCKER;

@Profile({PROFILE_DOCKER})
@ContextConfiguration(initializers = {TestContainersConfig.Initializer.class})
public abstract class TestContainersConfig {

    <%_ if (databaseType === 'postgresql') { _%>
    private static PostgreSQLContainer sqlContainer;

    @BeforeAll
    public static void setup() {
        sqlContainer = new PostgreSQLContainer("postgres:10.7")
                .withDatabaseName("integration-tests-db")
                .withUsername("sa")
                .withPassword("sa");
        sqlContainer.start();
    }
    <%_ } _%>
    <%_ if (databaseType === 'mysql') { _%>
    private static MySQLContainer sqlContainer;

    @BeforeAll
    public static void setup() {
        sqlContainer = new MySQLContainer("mysql:5.7.22")
                .withDatabaseName("integration-tests-db")
                .withUsername("sa")
                .withPassword("sa");
        sqlContainer.start();
    }
    <%_ } _%>
    <%_ if (databaseType === 'mariadb') { _%>
    private static MariaDBContainer sqlContainer;

    @BeforeAll
    public static void setup() {
        sqlContainer = new MariaDBContainer("mariadb:10.3.6")
                .withDatabaseName("integration-tests-db")
                .withUsername("sa")
                .withPassword("sa");
        sqlContainer.start();
    }
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
