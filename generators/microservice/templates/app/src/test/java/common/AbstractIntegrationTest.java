package <%= packageName %>.common;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;
import static <%= packageName %>.utils.Constants.PROFILE_IT;
import static <%= packageName %>.utils.Constants.PROFILE_TEST;

@ActiveProfiles({PROFILE_TEST, PROFILE_IT})
@SpringBootTest(webEnvironment = RANDOM_PORT)
@AutoConfigureMockMvc
public abstract class AbstractIntegrationTest {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

}
