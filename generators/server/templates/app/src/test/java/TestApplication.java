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
    
@TestConfiguration(proxyBeanMethods = false)
public class TestApplication {
    
    @Bean
    @ServiceConnection
    <%_ if (databaseType === 'postgresql') { _%>
    PostgreSQLContainer<?> postgreSQLContainer() {
        return new PostgreSQLContainer<>("<%= POSTGRESQL_IMAGE %>");
    }
    <%_ } _%>
    <%_ if (databaseType === 'mysql') { _%>
    MySQLContainer<?> sqlContainer () {
        return new MySQLContainer<>("<%= MYSQL_IMAGE %>");
    }
    <%_ } _%>
    <%_ if (databaseType === 'mariadb') { _%>
    MariaDBContainer<?> sqlContainer () {
        return new MariaDBContainer<>("<%= MARIADB_IMAGE %>");
    }
    <%_ } _%>

    public static void main(String[] args) {
        SpringApplication.from(Application::main).with(TestApplication.class).run(args);
    }
}
