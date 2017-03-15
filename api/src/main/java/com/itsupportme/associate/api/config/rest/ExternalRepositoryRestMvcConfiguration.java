package com.itsupportme.associate.api.config.rest;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.deser.BeanDeserializerBuilder;
import com.fasterxml.jackson.databind.deser.SettableBeanProperty;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.mapping.PersistentEntity;
import org.springframework.data.mapping.PersistentProperty;
import org.springframework.data.mapping.context.PersistentEntities;
import org.springframework.data.repository.support.RepositoryInvokerFactory;
import org.springframework.data.rest.core.UriToEntityConverter;
import org.springframework.data.rest.webmvc.EmbeddedResourcesAssembler;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.data.rest.webmvc.json.PersistentEntityJackson2Module;
import org.springframework.data.rest.webmvc.mapping.Associations;
import org.springframework.plugin.core.OrderAwarePluginRegistry;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.Iterator;

@Configuration
public class ExternalRepositoryRestMvcConfiguration extends RepositoryRestMvcConfiguration {

    @Override
    protected Module persistentEntityJackson2Module() {
        //Copy of RepositoryRestMvcConfiguration.persistentEntityJackson2Module() with wrapper of modifier

        PersistentEntities entities = persistentEntities();
        ConversionService conversionService = defaultConversionService();

        UriToEntityConverter uriToEntityConverter = uriToEntityConverter(conversionService);
        RepositoryInvokerFactory repositoryInvokerFactory = repositoryInvokerFactory(conversionService);

        EmbeddedResourcesAssembler assembler =
                new EmbeddedResourcesAssembler(entities, associationLinks(), excerptProjector());
        PersistentEntityJackson2Module.NestedEntitySerializer serializer =
                new PersistentEntityJackson2Module.NestedEntitySerializer(
                        entities, assembler, resourceProcessorInvoker()
                );
        PersistentEntityJackson2Module.LookupObjectSerializer lookupObjectSerializer =
                new PersistentEntityJackson2Module.LookupObjectSerializer(
                        OrderAwarePluginRegistry.create(getEntityLookups())
                );

        PersistentEntityJackson2Module module = new PersistentEntityJackson2Module(
                associationLinks(), entities, uriToEntityConverter, linkCollector(), repositoryInvokerFactory,
                serializer, lookupObjectSerializer
        );

        //Add wrapper of RepositoryRestMvcConfiguration.AssociationUriResolvingDeserializerModifier
        AssociationUriResolvingDeserializerModifierWrapper modifier =
                new AssociationUriResolvingDeserializerModifierWrapper(
                        entities, associationLinks(), uriToEntityConverter, repositoryInvokerFactory
                );
        module.setDeserializerModifier(modifier);

        return module;
    }

    private class AssociationUriResolvingDeserializerModifierWrapper extends
            PersistentEntityJackson2Module.AssociationUriResolvingDeserializerModifier
    {
        private String DESERIALIZER_CLASS_NAME =
                "org.springframework.data.rest.webmvc.json.PersistentEntityJackson2Module.UriStringDeserializer";
        private PersistentEntities entities;

        private AssociationUriResolvingDeserializerModifierWrapper(PersistentEntities entities,
                                                                  Associations associationLinks,
                                                                  UriToEntityConverter converter,
                                                                  RepositoryInvokerFactory factory) {
            super(entities, associationLinks, converter, factory);
            this.entities = entities;
        }

        @Override
        public BeanDeserializerBuilder updateBuilder(DeserializationConfig config, BeanDescription beanDesc,
                                                     BeanDeserializerBuilder builder) {
            //Run standard updateBuilder
            BeanDeserializerBuilder beanDeserializerBuilder = super.updateBuilder(config, beanDesc, builder);

            //Replace PersistentEntityJackson2Module.UriStringDeserializer by wrapper
            PersistentEntity<?, ?> entity = entities.getPersistentEntity(beanDesc.getBeanClass());

            if (entity == null) {
                return builder;
            }

            Iterator<SettableBeanProperty> iterator = beanDeserializerBuilder.getProperties();
            while (iterator.hasNext()) {
                SettableBeanProperty property = iterator.next();
                PersistentProperty<?> persistentProperty = entity.getPersistentProperty(property.getName());

                if (property.getValueDeserializer() != null &&
                        property.getValueDeserializer().getClass().getCanonicalName().equals(DESERIALIZER_CLASS_NAME))
                {
                    UriStringDeserializerWrapper wrapper =
                            new UriStringDeserializerWrapper(property.getValueDeserializer(), persistentProperty);
                    builder.addOrReplaceProperty(property.withValueDeserializer(wrapper), false);
                }
            }

            return beanDeserializerBuilder;
        }
    }

    private class UriStringDeserializerWrapper extends JsonDeserializer<Object> {
        private JsonDeserializer<Object> deserializer;
        private PersistentProperty<?> property;

        private UriStringDeserializerWrapper(JsonDeserializer<Object> deserializer, PersistentProperty<?> property) {
            this.deserializer = deserializer;
            this.property = property;
        }

        @Override
        public Object deserialize(JsonParser jp, DeserializationContext ctxt)
                throws IOException, JsonProcessingException
        {
            //Run standard deserialize, URI to Entity
            Object result = deserializer.deserialize(jp, ctxt);

            if (result == null && !StringUtils.hasText(jp.getValueAsString())) {
                //this is not url, deserialize as object
                result = jp.readValueAs(property.getActualType());
            }

            return result;
        }
    }
}
