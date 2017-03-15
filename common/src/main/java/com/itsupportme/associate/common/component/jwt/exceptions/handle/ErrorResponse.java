package com.itsupportme.associate.common.component.jwt.exceptions.handle;

import org.springframework.http.HttpStatus;

import java.util.Date;


public class ErrorResponse {
    private final HttpStatus status;
    private final String message;
    private final int errorCode;
    private final Date timestamp;

    protected ErrorResponse(final String message, final int errorCode, final HttpStatus status) {
        this.message = message;
        this.errorCode = errorCode;
        this.status = status;
        this.timestamp = new Date();
    }

    public static <S extends Exception> ErrorResponse of(S exception) {
        for(ErrorCode errorCode : ErrorCode.values()) {
            for (Class aClass : errorCode.getExceptions()) {
                if (exception.getClass() == aClass) {
                    return new ErrorResponse(errorCode.getMessage(exception), errorCode.getErrorCode(),
                            errorCode.getStatus());
                }
            }
        }

        return new ErrorResponse(exception.getMessage(), ErrorCode.UNEXPECTED_ERROR.getErrorCode(),
                ErrorCode.UNEXPECTED_ERROR.getStatus());
    }

    public Integer getStatus() {
        return status.value();
    }

    public String getMessage() {
        return message;
    }

    public int getErrorCode() {
        return errorCode;
    }

    public Date getTimestamp() {
        return timestamp;
    }
}
