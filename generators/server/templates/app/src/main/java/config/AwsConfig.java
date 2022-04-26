package <%= packageName %>.config;

import static <%= packageName %>.utils.AppConstants.PROFILE_NOT_TEST;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.sqs.AmazonSQSAsync;
import com.amazonaws.services.sqs.AmazonSQSAsyncClientBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile({PROFILE_NOT_TEST})
public class AwsConfig {
    @Autowired private ApplicationProperties properties;

    static {
        System.setProperty("com.amazonaws.sdk.disableCbor", "true");
    }

    @Bean
    @Primary
    public AmazonS3 amazonS3Client() {
        AmazonS3ClientBuilder builder = AmazonS3ClientBuilder.standard().enablePathStyleAccess();
        if (properties.getEndpointUri() != null
                && properties.getEndpointUri().trim().length() != 0) {
            builder.withEndpointConfiguration(getEndpointConfiguration());
            builder.withCredentials(getCredentialsProvider());
        }
        return builder.build();
    }

    @Bean
    @Primary
    public AmazonSQSAsync amazonSQSAsync() {
        AmazonSQSAsyncClientBuilder builder = AmazonSQSAsyncClientBuilder.standard();
        if (properties.getEndpointUri() != null
                && properties.getEndpointUri().trim().length() != 0) {
            builder.withEndpointConfiguration(getEndpointConfiguration());
            builder.withCredentials(getCredentialsProvider());
        }
        return builder.build();
    }

    private AWSCredentialsProvider getCredentialsProvider() {
        return new AWSStaticCredentialsProvider(new BasicAWSCredentials("test", "test"));
    }

    private AwsClientBuilder.EndpointConfiguration getEndpointConfiguration() {
        return new AwsClientBuilder.EndpointConfiguration(
                properties.getEndpointUri(), properties.getRegion());
    }
}
