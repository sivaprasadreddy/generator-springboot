package <%= packageName %>;

import <%= packageName %>.common.ContainersConfig;
import org.springframework.boot.SpringApplication;

import com.mycompany.myservice.Application;
import com.mycompany.myservice.common.ContainersConfig;

public class TestApplication {
    
    public static void main(String[] args) {
        SpringApplication.from(Application::main)
                .withAdditionalProfiles("local")
                .with(ContainersConfig.class)
                .run(args);
    }
}
