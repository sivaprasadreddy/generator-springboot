package com.mycompany.myservice.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "application")
@Data
public class ApplicationProperties {
    public static final Long DEFAULT_JWT_TOKEN_EXPIRES = 604800L;

    private JwtConfig jwt = new JwtConfig();

    @Data
    public static class JwtConfig {
        private String issuer = "bookmarker";
        private String header = "Authorization";
        private Long expiresIn = DEFAULT_JWT_TOKEN_EXPIRES;
        private String secret = "";
    }
}
