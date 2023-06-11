package <%= packageName %>.common;

import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.testcontainers.containers.localstack.LocalStackContainer;
import org.testcontainers.utility.DockerImageName;

public class LocalStackConfig
        implements ApplicationContextInitializer<ConfigurableApplicationContext> {
    static final LocalStackContainer localStackContainer = new LocalStackContainer(DockerImageName.parse("<%= LOCALSTACK_IMAGE %>"));

    static {
        localStackContainer.start();
    }

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        TestPropertyValues.of(
                        "spring.cloud.aws.endpoint="
                                + localStackContainer.getEndpoint(),
                        "spring.cloud.aws.region.static=" + localStackContainer.getRegion(),
                        "spring.cloud.aws.credentials.access-key="
                                + localStackContainer.getAccessKey(),
                        "spring.cloud.aws.credentials.secret-key="
                                + localStackContainer.getSecretKey())
                .applyTo(applicationContext.getEnvironment());
    }
}
