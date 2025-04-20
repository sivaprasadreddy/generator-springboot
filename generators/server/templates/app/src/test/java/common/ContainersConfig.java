package <%= packageName %>.common;

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
import org.testcontainers.containers.localstack.LocalStackContainer;
<%_ } _%>
import org.testcontainers.utility.DockerImageName;

@TestConfiguration(proxyBeanMethods = false)
public class ContainersConfig {

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
    @ServiceConnection
    LocalStackContainer localStackContainer() {
        return new LocalStackContainer(DockerImageName.parse("<%= LOCALSTACK_IMAGE %>"));
    }
    <%_ } _%>
}
