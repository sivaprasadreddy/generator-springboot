package <%= packageName %>.common;

import static org.testcontainers.containers.localstack.LocalStackContainer.Service.S3;
import static org.testcontainers.containers.localstack.LocalStackContainer.Service.SQS;

import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.testcontainers.containers.localstack.LocalStackContainer;
import org.testcontainers.utility.DockerImageName;

public class LocalStackConfig
        implements ApplicationContextInitializer<ConfigurableApplicationContext> {
    static LocalStackContainer localStackContainer;

    static {
        localStackContainer =
                new LocalStackContainer(DockerImageName.parse("<%= LOCALSTACK_IMAGE %>"))
                        .withServices(S3, SQS)
                        .withExposedPorts(4566);
        localStackContainer.start();
    }

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        TestPropertyValues.of(
                        "spring.cloud.aws.sqs.endpoint="
                                + localStackContainer.getEndpointOverride(SQS),
                        "spring.cloud.aws.sqs.region=" + localStackContainer.getRegion(),
                        "spring.cloud.aws.region.static=" + localStackContainer.getRegion(),
                        "spring.cloud.aws.credentials.access-key="
                                + localStackContainer.getAccessKey(),
                        "spring.cloud.aws.credentials.secret-key="
                                + localStackContainer.getSecretKey())
                .applyTo(applicationContext.getEnvironment());
    }
}
