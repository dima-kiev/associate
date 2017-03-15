package com.itsupportme.associate.common.component.jwt.exceptions;

import org.springframework.security.core.AuthenticationException;

public class RequiredFieldEmptyException extends AuthenticationException {

    public RequiredFieldEmptyException(String msg, Throwable t) {
        super(msg, t);
    }
}
