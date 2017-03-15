package com.itsupportme.associate.common.component.jwt.exceptions.handle;

import com.itsupportme.associate.common.component.jwt.exceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;

public enum ErrorCode {
    AUTHENTICATION_FAILED(1, HttpStatus.UNAUTHORIZED, "Authentication failed", AuthMethodNotSupportedException.class,
            InvalidJwtToken.class),
    JWT_TOKEN_EXPIRED(2, HttpStatus.UNAUTHORIZED, "Token has expired", JwtExpiredTokenException.class),
    BAD_CREDENTIALS(3, HttpStatus.BAD_REQUEST, "Username or Password not valid", BadCredentialsException.class),
    NOT_VALID_JSON(4, HttpStatus.BAD_REQUEST,  "Content does not conform to JSON syntax", NotValidJsonException.class),
    REQUIRED_FIELD_EMPTY(5, HttpStatus.BAD_REQUEST, null, RequiredFieldEmptyException.class),
    ACCESS_DENIED(6, HttpStatus.FORBIDDEN, "You don't have permission to access", AccessDeniedException.class),

    UNEXPECTED_ERROR(100, HttpStatus.INTERNAL_SERVER_ERROR, null);
    
    private int errorCode;
    private HttpStatus status;
    private String message;
    private Class[] exceptions;


    ErrorCode(int errorCode, HttpStatus status, String message, Class... exceptions) {
        this.errorCode = errorCode;
        this.status = status;
        this.message = message;
        this.exceptions = exceptions;
    }

    public String getMessage(Exception ex) {
        if (message == null || message.isEmpty()) {
            return ex.getMessage();
        }

        return message;
    }

    public int getErrorCode() {
        return errorCode;
    }

    public Class[] getExceptions() {
        return exceptions;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}
