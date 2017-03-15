package com.itsupportme.associate.api.config.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.RepositoryRestHandlerMapping;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.data.rest.webmvc.support.DelegatingHandlerMapping;
import org.springframework.web.servlet.HandlerMapping;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class InternalRepositoryRestMvcConfiguration extends RepositoryRestMvcConfiguration {
    @Autowired
    private ApplicationContext applicationContext;

    @Bean
    public DelegatingHandlerMapping restHandlerMapping() {

        RepositoryRestHandlerMapping repositoryMapping = new RepositoryRestHandlerMapping(resourceMappings(), config());
        repositoryMapping.setJpaHelper(jpaHelper());
        repositoryMapping.setApplicationContext(applicationContext);
        repositoryMapping.afterPropertiesSet();

        InternalBasePathAwareHandlerMapping basePathMapping = new InternalBasePathAwareHandlerMapping(config());
        basePathMapping.setApplicationContext(applicationContext);
        basePathMapping.afterPropertiesSet();

        List<HandlerMapping> mappings = new ArrayList<HandlerMapping>();
        mappings.add(basePathMapping);
        mappings.add(repositoryMapping);

        return new DelegatingHandlerMapping(mappings);
    }
}
