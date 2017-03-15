package com.itsupportme.associate.common.component.jwt.exceptions;

import org.springframework.security.core.AuthenticationException;

public class NotValidJsonException extends AuthenticationException {

    public NotValidJsonException(Throwable t) {
        super("Content does not conform to JSON syntax", t);
    }
}
