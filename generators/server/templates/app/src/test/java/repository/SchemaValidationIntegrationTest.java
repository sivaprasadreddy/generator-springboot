package <%= packageName %>.repository;

import <%= packageName %>.common.AbstractIntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.TestPropertySource;

@TestPropertySource(properties = {"spring.jpa.hibernate.ddl-auto=validate"})
public class SchemaValidationIntegrationTest extends AbstractIntegrationTest {

    @Test
    void schemaIsValid() {}
}
