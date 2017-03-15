package com.itsupportme.associate.common.component.jwt.exceptions;

import org.springframework.security.core.AuthenticationException;

public class InvalidJwtToken extends AuthenticationException {

    public InvalidJwtToken(Throwable t) {
        super("Invalid JWT Token", t);
    }

    public InvalidJwtToken(String msg, Throwable t) {
        super(msg, t);
    }
}
