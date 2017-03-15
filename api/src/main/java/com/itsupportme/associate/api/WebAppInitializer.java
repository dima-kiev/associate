package com.itsupportme.associate.api;

import com.itsupportme.associate.api.config.WebConfig;
import com.itsupportme.associate.api.config.rest.ExternalRestConfig;
import com.itsupportme.associate.api.config.rest.InternalRestConfig;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.BeanFactoryUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.data.jpa.repository.support.JpaRepositoryFactoryBean;
import org.springframework.data.repository.core.support.RepositoryFactoryInformation;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.util.ClassUtils;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletRegistration;
import java.util.ArrayList;
import java.util.List;

public class WebAppInitializer implements WebApplicationInitializer {
    private static final Logger logger = Logger.getLogger(WebAppInitializer.class);

    private static final String INTERNAL_DISPATCHER = "internalDispatcher";
    private static final String EXTERNAL_DISPATCHER = "externalDispatcher";

    @Override
    public void onStartup(ServletContext container) {
        // root context
        AnnotationConfigWebApplicationContext rootContext = new AnnotationConfigWebApplicationContext();
        rootContext.register(WebConfig.class); // configuration class for root context
        container.addListener(new ContextLoaderListener(rootContext));
        ServletRegistration.Dynamic rootDispatcher =
                container.addServlet("rootDispatcher", new DispatcherServlet(rootContext));

        rootDispatcher.setLoadOnStartup(1);
        rootDispatcher.addMapping("/");

        // Internal REST context
        AnnotationConfigWebApplicationContext internalContext = new AnnotationConfigWebApplicationContext();
        internalContext.setParent(rootContext);
        internalContext.register(InternalRestConfig.class);
        internalContext.addApplicationListener(new ApplicationListenerBean());
        ServletRegistration.Dynamic internalDispatcher =
                container.addServlet(INTERNAL_DISPATCHER, new DispatcherServlet(internalContext));

        internalDispatcher.setLoadOnStartup(2);
        internalDispatcher.addMapping("/api/internal/*");

        // External REST context
        AnnotationConfigWebApplicationContext externalContext = new AnnotationConfigWebApplicationContext();
        externalContext.setParent(rootContext);
        externalContext.register(ExternalRestConfig.class);
        externalContext.addApplicationListener(new ApplicationListenerBean());
        ServletRegistration.Dynamic externalDispatcher =
                container.addServlet(EXTERNAL_DISPATCHER, new DispatcherServlet(externalContext));

        externalDispatcher.setLoadOnStartup(3);
        externalDispatcher.addMapping("/api/external/*");

    }

    private class ApplicationListenerBean implements ApplicationListener {

        @Override
        public void onApplicationEvent(ApplicationEvent event) {
            if (event instanceof ContextRefreshedEvent) {
                ApplicationContext applicationContext = ((ContextRefreshedEvent) event).getApplicationContext();

                List<Class> entities = new ArrayList<>();

                for (String name : BeanFactoryUtils.beanNamesForTypeIncludingAncestors(applicationContext,
                        RepositoryFactoryInformation.class, false, false)) {

                    RepositoryFactoryInformation repositoryFactoryInformation = applicationContext.getBean(name,
                            RepositoryFactoryInformation.class);
                    Class<?> domainType = ClassUtils
                            .getUserClass(repositoryFactoryInformation.getRepositoryInformation().getDomainType());

                    if (entities.contains(domainType)) {
                        throw new RuntimeException("Found more than one repository for Entity " + domainType,
                                new Throwable());
                    }

                    entities.add(domainType);

                    if (repositoryFactoryInformation instanceof JpaRepositoryFactoryBean) {
                        Class<?> repository = ((JpaRepositoryFactoryBean) repositoryFactoryInformation).getObjectType();

                        RepositoryRestResource repositoryRestResource =
                                repository.getAnnotation(RepositoryRestResource.class);

                        if (repositoryRestResource != null && repositoryRestResource.exported()) {

                            String displayName = "";

                            if (applicationContext.getDisplayName().contains(EXTERNAL_DISPATCHER)) {
                                displayName = "External REST context:";
                            } else if (applicationContext.getDisplayName().contains(INTERNAL_DISPATCHER)) {
                                displayName = "Internal REST context:";
                            }

                            logger.warn(displayName + " repository " + repository.getName() + " will be added");
                        }
                    }

                }

            }
        }
    }
}