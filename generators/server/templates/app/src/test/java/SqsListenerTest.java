package <%= packageName %>;

import static org.assertj.core.api.Assertions.assertThat;

import com.amazonaws.services.sqs.AmazonSQSAsync;
import com.amazonaws.services.sqs.model.AmazonSQSException;
import com.amazonaws.services.sqs.model.CreateQueueRequest;
import com.amazonaws.services.sqs.model.Message;
import <%= packageName %>.common.LocalStackConfig;
import java.time.Duration;
import java.util.List;
import org.awaitility.Awaitility;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.cloud.aws.autoconfigure.messaging.MessagingAutoConfiguration;
import org.springframework.cloud.aws.messaging.core.QueueMessagingTemplate;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@Import({LocalStackConfig.class})
@ImportAutoConfiguration({MessagingAutoConfiguration.class})
public class SqsListenerTest {

    @Autowired private AmazonSQSAsync amazonSQS;

    @Test
    void shouldSendAndReceiveSqsMessage() {
        String queueName = "test_queue";
        this.createQueue(queueName);

        QueueMessagingTemplate queueMessagingTemplate = new QueueMessagingTemplate(amazonSQS);
        queueMessagingTemplate.convertAndSend(queueName, "test message");

        String queueUrl = amazonSQS.getQueueUrl(queueName).getQueueUrl();

        Awaitility.given()
                .atMost(Duration.ofSeconds(30))
                .pollInterval(Duration.ofSeconds(3))
                .await()
                .untilAsserted(
                        () -> {
                            List<Message> messages =
                                    amazonSQS.receiveMessage(queueUrl).getMessages();
                            assertThat(messages).isNotEmpty();
                        });
    }

    private void createQueue(String queueName) {
        CreateQueueRequest createQueueRequest =
                new CreateQueueRequest(queueName)
                        .addAttributesEntry("MessageRetentionPeriod", "86400");

        try {
            amazonSQS.createQueue(createQueueRequest);
        } catch (AmazonSQSException e) {
            if (!e.getErrorCode().equals("QueueAlreadyExists")) {
                throw e;
            }
        }
    }
}
