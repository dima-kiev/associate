package com.itsupportme.associate.common.component.jwt.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AccessControlSettings {
    @Value("${app.allowed_origin}")
    private String accessControlAllowOrigin;

    @Value("${app.allowed_method}")
    private String accessControlAllowMethods;

    @Value("${app.allowed_max_age}")
    private String accessControlMaxAge;

    @Value("${app.allowed_headers}")
    private String accessControlAllowHeaders;

    public String getAccessControlAllowOrigin() {
        return accessControlAllowOrigin;
    }

    public String getAccessControlAllowMethods() {
        return accessControlAllowMethods;
    }

    public String getAccessControlMaxAge() {
        return accessControlMaxAge;
    }

    public String getAccessControlAllowHeaders() {
        return accessControlAllowHeaders;
    }
}
