package <%= packageName %>.common;

import static org.testcontainers.containers.localstack.LocalStackContainer.Service.S3;
import static org.testcontainers.containers.localstack.LocalStackContainer.Service.SQS;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.sqs.AmazonSQSAsync;
import com.amazonaws.services.sqs.AmazonSQSAsyncClientBuilder;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.testcontainers.containers.localstack.LocalStackContainer;
import org.testcontainers.utility.DockerImageName;

@TestConfiguration
public class LocalStackConfig {
    static LocalStackContainer localStackContainer;

    static {
        System.setProperty("com.amazonaws.sdk.disableCbor", "true");
        localStackContainer =
                new LocalStackContainer(DockerImageName.parse("localstack/localstack:0.14.2"))
                        .withServices(S3, SQS)
                        .withExposedPorts(4566);
        localStackContainer.start();
    }

    @Bean
    @Primary
    public AmazonS3 localstackAmazonS3() {
        return AmazonS3ClientBuilder.standard()
                .enablePathStyleAccess()
                .withEndpointConfiguration(localStackContainer.getEndpointConfiguration(SQS))
                .withCredentials(getCredentialsProvider())
                .build();
    }

    @Bean
    @Primary
    public AmazonSQSAsync localstackAmazonSQSAsync() {
        return AmazonSQSAsyncClientBuilder.standard()
                .withEndpointConfiguration(localStackContainer.getEndpointConfiguration(SQS))
                .withCredentials(getCredentialsProvider())
                .build();
    }

    private AWSCredentialsProvider getCredentialsProvider() {
        return new AWSStaticCredentialsProvider(new BasicAWSCredentials("test", "test"));
    }
}
