package com.itsupportme.associate.common.component.jwt.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtSettings {
    @Value("${token.expiration.time}")
    private Integer tokenExpirationTime;

    @Value("${token.issuer}")
    private String tokenIssuer;
    
    @Value("${token.signing.key}")
    private String tokenSigningKey;

    @Value("${refresh.token.exp.time}")
    private Integer refreshTokenExpTime;

    public Integer getTokenExpirationTime() {
        return tokenExpirationTime;
    }

    public String getTokenIssuer() {
        return tokenIssuer;
    }

    public String getTokenSigningKey() {
        return tokenSigningKey;
    }

    public Integer getRefreshTokenExpTime() {
        return refreshTokenExpTime;
    }
}
