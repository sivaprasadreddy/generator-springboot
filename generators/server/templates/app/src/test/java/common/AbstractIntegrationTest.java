package <%= packageName %>.common;

import static <%= packageName %>.utils.AppConstants.PROFILE_TEST;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

import <%= packageName %>.TestApplication;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
<%_ if (features.includes('localstack')) { _%>
import org.springframework.test.context.ContextConfiguration;
<%_ } _%>
import org.springframework.test.web.servlet.MockMvc;

@ActiveProfiles({PROFILE_TEST})
@SpringBootTest(webEnvironment = RANDOM_PORT, classes = {TestApplication.class})
<%_ if (features.includes('localstack')) { _%>
@ContextConfiguration(initializers = {LocalStackConfig.class})
<%_ } _%>
@AutoConfigureMockMvc
public abstract class AbstractIntegrationTest {

    @Autowired protected MockMvc mockMvc;

    @Autowired protected ObjectMapper objectMapper;
}
