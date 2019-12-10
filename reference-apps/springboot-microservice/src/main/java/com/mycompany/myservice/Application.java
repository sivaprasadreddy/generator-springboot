package com.mycompany.myservice;

import com.mycompany.myservice.config.ApplicationProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.zalando.problem.spring.web.autoconfigure.security.SecurityConfiguration;

@SpringBootApplication(exclude = {ErrorMvcAutoConfiguration.class, SecurityConfiguration.class})
@EnableConfigurationProperties(value = {ApplicationProperties.class})
@EnableAspectJAutoProxy
@EnableCaching
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}

