package com.itsupportme.associate.api.config.rest;

import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.data.rest.webmvc.BasePathAwareHandlerMapping;
import org.springframework.data.rest.webmvc.RepositoryRestController;

public class InternalBasePathAwareHandlerMapping extends BasePathAwareHandlerMapping {

    public InternalBasePathAwareHandlerMapping(RepositoryRestConfiguration configuration) {
        super(configuration);
    }

    @Override
    protected boolean isHandler(Class<?> beanType) {
        return AnnotationUtils.findAnnotation(beanType, BasePathAwareController.class) != null &&
                AnnotationUtils.findAnnotation(beanType, RepositoryRestController.class) == null;
    }

}
