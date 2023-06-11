package <%= packageName %>;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.Bean;
<%_ if (databaseType === 'postgresql') { _%>
import org.testcontainers.containers.PostgreSQLContainer;
<%_ } _%>
<%_ if (databaseType === 'mysql') { _%>
import org.testcontainers.containers.MySQLContainer;
<%_ } _%>
<%_ if (databaseType === 'mariadb') { _%>
import org.testcontainers.containers.MariaDBContainer;
<%_ } _%>
<%_ if (features.includes('localstack')) { _%>
import org.springframework.test.context.DynamicPropertyRegistry;
import org.testcontainers.containers.localstack.LocalStackContainer;
<%_ } _%>
import org.testcontainers.utility.DockerImageName;
    
@TestConfiguration(proxyBeanMethods = false)
public class TestApplication {
    
    @Bean
    @ServiceConnection
    <%_ if (databaseType === 'postgresql') { _%>
    PostgreSQLContainer<?> postgreSQLContainer() {
        return new PostgreSQLContainer<>(DockerImageName.parse("<%= POSTGRESQL_IMAGE %>"));
    }
    <%_ } _%>
    <%_ if (databaseType === 'mysql') { _%>
    MySQLContainer<?> sqlContainer () {
        return new MySQLContainer<>(DockerImageName.parse("<%= MYSQL_IMAGE %>"));
    }
    <%_ } _%>
    <%_ if (databaseType === 'mariadb') { _%>
    MariaDBContainer<?> sqlContainer () {
        return new MariaDBContainer<>(DockerImageName.parse("<%= MARIADB_IMAGE %>"));
    }
    <%_ } _%>

    <%_ if (features.includes('localstack')) { _%>
    @Bean
    LocalStackContainer localStackContainer(DynamicPropertyRegistry propertyRegistry) {
        LocalStackContainer localStackContainer =
                new LocalStackContainer(DockerImageName.parse("<%= LOCALSTACK_IMAGE %>"));
        propertyRegistry.add("spring.cloud.aws.endpoint", localStackContainer::getEndpoint);
        propertyRegistry.add("spring.cloud.aws.region.static", localStackContainer::getRegion);
        propertyRegistry.add("spring.cloud.aws.credentials.access-key", localStackContainer::getAccessKey);
        propertyRegistry.add("spring.cloud.aws.credentials.secret-key", localStackContainer::getSecretKey);
        return localStackContainer;
    <%_ } _%>

    public static void main(String[] args) {
        SpringApplication.from(Application::main).with(TestApplication.class).run(args);
    }
}
