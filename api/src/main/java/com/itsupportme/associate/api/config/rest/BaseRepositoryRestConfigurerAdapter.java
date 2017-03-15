package com.itsupportme.associate.api.config.rest;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.core.mapping.RepositoryDetectionStrategy;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.validation.Validator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class BaseRepositoryRestConfigurerAdapter extends RepositoryRestConfigurerAdapter {

    private ValidatingRepositoryEventListener validatingListener;

    private List<Validator> beforeCreateValidators = new ArrayList<>();
    private List<Validator> beforeSaveValidators = new ArrayList<>();

    public void addBeforeCreateValidators(Validator... validators) {
        beforeCreateValidators.addAll(Arrays.asList(validators));
    }

    public void addBeforeSaveValidators(Validator... validators) {
        beforeSaveValidators.addAll(Arrays.asList(validators));
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.setRepositoryDetectionStrategy(
                RepositoryDetectionStrategy.RepositoryDetectionStrategies.ANNOTATED
        );
        config.setReturnBodyOnCreate(true);
        config.setReturnBodyOnUpdate(true);
        config.setReturnBodyForPutAndPost(true);
    }

    @Override
    public void configureValidatingRepositoryEventListener(ValidatingRepositoryEventListener
                                                                   validatingListener)
    {
        beforeCreateValidators.forEach(it -> validatingListener.addValidator("beforeCreate", it));
        beforeSaveValidators.forEach(it -> validatingListener.addValidator("beforeSave", it));

        this.validatingListener = validatingListener;
    }

    public ValidatingRepositoryEventListener getValidatingListener() {
        return validatingListener;
    }
}
