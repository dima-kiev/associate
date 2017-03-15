package com.itsupportme.associate.api.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
@EnableAsync
@ComponentScan(
        basePackages = {
                "com.itsupportme.associate.common.component",
                "com.itsupportme.associate.api.component",
                "com.itsupportme.associate.entity.service",
                "com.itsupportme.associate.api.controller.root"
        }
)
@Import({DbConfig.class, Beans.class})
public class WebConfig {

    @Autowired
    private ApplicationContext applicationContext;


}
