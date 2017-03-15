package com.itsupportme.associate.common.component.jwt.auth.jwt.extractor;

import com.itsupportme.associate.common.component.jwt.exceptions.InvalidJwtToken;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;


@Component
public class JwtHeaderTokenExtractor implements TokenExtractor {
    public static String HEADER_PREFIX = "Bearer ";

    @Override
    public String extract(String header) {
        if (StringUtils.isBlank(header)) {
            throw new InvalidJwtToken("Authorization header cannot be blank!", new Throwable());
        }

        if (header.length() < HEADER_PREFIX.length()) {
            throw new InvalidJwtToken("Invalid authorization header size.", new Throwable());
        }

        return header.substring(HEADER_PREFIX.length(), header.length());
    }
}
