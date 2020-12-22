package <%= packageName %>.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class Initializer implements CommandLineRunner {

    private final ApplicationProperties properties;

    @Override
    public void run(String... args) {
        log.info("Running Initializer.....");
    }
}
