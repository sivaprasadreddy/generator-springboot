package <%= packageName %>;

import static org.assertj.core.api.Assertions.assertThat;

import <%= packageName %>.common.AbstractIntegrationTest;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import lombok.extern.slf4j.Slf4j;
import org.awaitility.Awaitility;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import software.amazon.awssdk.services.sqs.SqsAsyncClient;
import software.amazon.awssdk.services.sqs.model.CreateQueueRequest;
import software.amazon.awssdk.services.sqs.model.CreateQueueResponse;
import software.amazon.awssdk.services.sqs.model.Message;
import software.amazon.awssdk.services.sqs.model.QueueAttributeName;
import software.amazon.awssdk.services.sqs.model.ReceiveMessageResponse;

@Slf4j
class SqsListenerIntegrationTest extends AbstractIntegrationTest {

    @Autowired private SqsAsyncClient sqsAsyncClient;

    @Test
    void shouldSendAndReceiveSqsMessage() throws ExecutionException, InterruptedException {
        String queueName = "test_queue";
        String queueURL =
                this.createQueue(queueName).thenApply(CreateQueueResponse::queueUrl).get();

        this.sqsAsyncClient
                .sendMessage(request -> request.messageBody("test message").queueUrl(queueURL))
                .thenRun(() -> log.info("Message sent successfully to the Amazon sqs."));

        Awaitility.given()
                .atMost(Duration.ofSeconds(30))
                .pollInterval(Duration.ofSeconds(3))
                .await()
                .untilAsserted(
                        () -> {
                            List<Message> messages =
                                    sqsAsyncClient
                                            .receiveMessage(builder -> builder.queueUrl(queueURL))
                                            .thenApply(ReceiveMessageResponse::messages)
                                            .get();
                            assertThat(messages).isNotEmpty();
                        });
    }

    private CompletableFuture<CreateQueueResponse> createQueue(String queueName) {
        CreateQueueRequest createQueueRequest =
                CreateQueueRequest.builder()
                        .queueName(queueName)
                        .attributes(Map.of(QueueAttributeName.MESSAGE_RETENTION_PERIOD, "86400"))
                        .build();

        return sqsAsyncClient.createQueue(createQueueRequest);
    }
}
