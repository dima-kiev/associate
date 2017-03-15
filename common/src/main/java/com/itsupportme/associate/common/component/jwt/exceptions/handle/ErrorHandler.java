package com.itsupportme.associate.common.component.jwt.exceptions.handle;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class ErrorHandler {
    @Autowired
    @Qualifier("jwtObjectMapper")
    private ObjectMapper mapper;

    public void handle(HttpServletResponse response, Exception e) throws IOException {
        ErrorResponse errorResponse = ErrorResponse.of(e);

        response.setStatus(errorResponse.getStatus());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        mapper.writeValue(response.getWriter(), errorResponse);
    }
}
