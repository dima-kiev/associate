package com.itsupportme.associate.common.component.jwt.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SecurityBeansConfig {

    @Bean(name = "jwtObjectMapper")
    public ObjectMapper jwtObjectMapper() {
        return new ObjectMapper();
    }

}
