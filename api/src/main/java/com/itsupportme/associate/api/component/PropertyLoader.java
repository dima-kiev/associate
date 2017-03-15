package com.itsupportme.associate.api.component;

import org.apache.log4j.Logger;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import java.io.IOException;
import java.util.Properties;

public class PropertyLoader {

    private static final Logger logger = Logger.getLogger(PropertyLoader.class);

    public static Properties load(String filename) {

        Resource resource = new ClassPathResource(filename);

        Properties properties;
        try {
            properties         = PropertiesLoaderUtils.loadProperties(resource);
        } catch (IOException e) {
            logger.error("Unable to load properties: " + filename);
            throw new RuntimeException(e);
        }

        logger.info("==========================================================================");
        logger.info("Started with those parameters:");
        logger.info("==========================================================================");
        properties.forEach((key,value) -> logger.info(key + " = " + value));
        logger.info("==========================================================================");

        return properties;
    }
}
