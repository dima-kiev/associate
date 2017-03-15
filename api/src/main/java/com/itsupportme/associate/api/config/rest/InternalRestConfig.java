package com.itsupportme.associate.api.config.rest;

import com.fasterxml.jackson.databind.BeanDescription;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationConfig;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.BeanSerializerModifier;
import com.itsupportme.associate.api.component.SecurityEvaluationContextExtension;
import com.itsupportme.associate.api.component.deserializer.JsonLocalDateDeserializer;
import com.itsupportme.associate.api.component.serializer.JsonLocalDateSerializer;
import com.itsupportme.associate.api.component.serializer.UserSerializer;
import com.itsupportme.associate.entity.entity.User;
import org.springframework.context.annotation.*;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.spi.EvaluationContextExtension;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.validation.Validator;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;

@EnableSpringDataWebSupport
@Configuration
@EnableJpaRepositories(basePackages = {"com.itsupportme.associate.api.rest.internal"})
@Import({InternalRepositoryRestMvcConfiguration.class, SecurityConfig.class})
@ComponentScan(
        basePackages = {
                "com.itsupportme.associate.api.controller.internal" //,"com.itsupportme.associate.entity.dsl"
        }
)
public class InternalRestConfig {

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
                objectMapper.registerModule(new SimpleModule("JsonMarshallingConfirmationModule") {
                    @Override
                    public String getModuleName() {
                        return "JsonMarshallingConfirmationModule";
                    }

                    @Override
                    public void setupModule(SetupContext context) {

                        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm");
                        objectMapper.setDateFormat(df);

                        context.addBeanSerializerModifier(new BeanSerializerModifier() {
                            @Override
                            public JsonSerializer<?> modifySerializer(SerializationConfig config, BeanDescription beanDesc,
                                                                      JsonSerializer<?> serializer) {
                               if(beanDesc.getBeanClass().equals(User.class)) {
                                    return new UserSerializer(User.class);
                                }
                               return serializer;
                            }
                        });
                    }
                });

                SimpleModule module = new SimpleModule("LocalDateModule");

                module.addSerializer(LocalDate.class, new JsonLocalDateSerializer());
                module.addDeserializer(LocalDate.class, new JsonLocalDateDeserializer());

                objectMapper.registerModule(module);
            }
        };

        //adapter.addBeforeCreateValidators(validator(), confirmationValidator);
        //adapter.addBeforeSaveValidators(validator(), confirmationValidator);

        return adapter;
    }

}
