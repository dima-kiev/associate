package com.itsupportme.associate.api.config.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.itsupportme.associate.api.component.SecurityEvaluationContextExtension;
import com.itsupportme.associate.api.component.deserializer.JsonLocalDateDeserializer;
import com.itsupportme.associate.api.component.serializer.JsonLocalDateSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.spi.EvaluationContextExtension;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.validation.Validator;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import java.time.LocalDate;

@Configuration
@EnableJpaRepositories(basePackages = {"com.itsupportme.associate.api.rest.external"})
@Import({ExternalRepositoryRestMvcConfiguration.class, SecurityConfig.class})
public class ExternalRestConfig {

/*    @Autowired
    private ConfirmationValidator confirmationValidator;

    @Autowired
    private ConfirmationHandler confirmationHandler;

    @Autowired
    private EntryHandler entryHandler;*/

    @Bean
    @Primary
    public Validator validator() {
        return new LocalValidatorFactoryBean();
    }

    @Bean
    public EvaluationContextExtension securityExtension() {
        return new SecurityEvaluationContextExtension();
    }

    @Bean
    public RepositoryRestConfigurer repositoryRestConfigurer() {
        BaseRepositoryRestConfigurerAdapter adapter = new BaseRepositoryRestConfigurerAdapter() {
            @Override
            public void configureJacksonObjectMapper(ObjectMapper objectMapper) {
                SimpleModule module = new SimpleModule("LocalDateModule");

                module.addSerializer(LocalDate.class, new JsonLocalDateSerializer());
                module.addDeserializer(LocalDate.class, new JsonLocalDateDeserializer());

                objectMapper.registerModule(module);
            }
        };

        //adapter.addBeforeCreateValidators(validator(), confirmationValidator);
        //adapter.addBeforeSaveValidators(validator(), confirmationValidator);


        //confirmationHandler.setAdapter(adapter);
        //entryHandler.setAdapter(adapter);

        return adapter;

    }
}
