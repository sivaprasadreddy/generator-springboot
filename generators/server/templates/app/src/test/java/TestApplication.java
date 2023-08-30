package <%= packageName %>;

import <%= packageName %>.common.ContainersConfig;
import org.springframework.boot.SpringApplication;

public class TestApplication {
    
    public static void main(String[] args) {
        System.setProperty("spring.profiles.active", "local");
        SpringApplication.from(Application::main).with(ContainersConfig.class).run(args);
    }
}
