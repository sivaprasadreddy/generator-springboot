package <%= packageName %>.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties("application")
public class ApplicationProperties {
    <%_ if (features.includes('localstack')) { _%>
    private String endpointUri;
    private String region;
    <%_ } _%>
}
